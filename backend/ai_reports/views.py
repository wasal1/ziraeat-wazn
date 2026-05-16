from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import serializers
from django.conf import settings
from django.utils import timezone
import anthropic
from .models import AIReport
from farms.models import Farm
from cycles.models import AgriculturalCycle


class AIReportSerializer(serializers.ModelSerializer):
    farm_name   = serializers.CharField(source='farm.name', read_only=True)
    type_label  = serializers.CharField(source='get_report_type_display', read_only=True)
    status_label = serializers.CharField(source='get_status_display', read_only=True)

    class Meta:
        model  = AIReport
        fields = ['id', 'farm', 'farm_name', 'cycle', 'report_type', 'type_label',
                  'status', 'status_label', 'result', 'tokens_used', 'cost_usd',
                  'created_at', 'completed_at']


class AIReportListView(APIView):
    def get(self, request):
        qs = AIReport.objects.filter(farm__organization=request.user.organization)
        if request.query_params.get('farm'):
            qs = qs.filter(farm_id=request.query_params['farm'])
        return Response(AIReportSerializer(qs, many=True).data)


class AIReportDetailView(APIView):
    def get(self, request, pk):
        try:
            obj = AIReport.objects.get(pk=pk, farm__organization=request.user.organization)
            return Response(AIReportSerializer(obj).data)
        except AIReport.DoesNotExist:
            return Response({'detail': 'غير موجود'}, status=404)


class GenerateReportView(APIView):
    def post(self, request):
        farm_id     = request.data.get('farm_id')
        cycle_id    = request.data.get('cycle_id')
        report_type = request.data.get('report_type', 'general')
        custom_q    = request.data.get('question', '')

        try:
            farm = Farm.objects.get(pk=farm_id, organization=request.user.organization)
        except Farm.DoesNotExist:
            return Response({'detail': 'المزرعة غير موجودة'}, status=404)

        cycle = None
        if cycle_id:
            try:
                cycle = AgriculturalCycle.objects.get(pk=cycle_id, farm=farm)
            except AgriculturalCycle.DoesNotExist:
                pass

        # Build context prompt
        context = f"""
أنت مستشار زراعي خبير. فيما يلي بيانات المزرعة:
- اسم المزرعة: {farm.name}
- الموقع: {farm.location or 'غير محدد'}
- المساحة: {farm.area_ha or 'غير محدد'} هكتار
"""
        if cycle:
            context += f"""
- الدورة الزراعية: {cycle.name}
- المحصول: {cycle.crop.name}
- الحالة: {cycle.get_status_display()}
- تاريخ البدء: {cycle.start_date}
- الإنتاج المستهدف: {cycle.target_yield or 'غير محدد'} كجم
"""

        report_prompts = {
            'weekly_summary':   'اكتب ملخصاً أسبوعياً شاملاً للمزرعة مع توصيات عملية للأسبوع القادم.',
            'cycle_analysis':   'حلل الدورة الزراعية الحالية وقدم توصيات لتحسين الإنتاجية.',
            'cost_analysis':    'قدم تحليلاً للتكاليف وطرق تقليل النفقات مع الحفاظ على الجودة.',
            'pest_advice':      'قدم توصيات وقائية وعلاجية للأمراض والآفات الشائعة لهذا المحصول.',
            'harvest_forecast': 'اعمل توقعاً للحصاد بناءً على البيانات المتاحة.',
            'irrigation_plan':  'اقترح خطة ري مثالية بناءً على المحصول والموسم.',
            'general':          custom_q or 'قدم تقييماً عاماً للمزرعة مع أهم التوصيات.',
        }

        prompt = context + '\n\n' + report_prompts.get(report_type, custom_q)

        # Create report record
        report = AIReport.objects.create(
            farm=farm, cycle=cycle, report_type=report_type,
            status='pending', prompt_used=prompt, requested_by=request.user
        )

        # Call Claude API
        if not settings.ANTHROPIC_API_KEY:
            report.status = 'failed'
            report.result = 'مفتاح Anthropic API غير مضبوط.'
            report.save()
            return Response({'detail': 'ANTHROPIC_API_KEY غير مضبوط'}, status=503)

        try:
            client   = anthropic.Anthropic(api_key=settings.ANTHROPIC_API_KEY)
            response = client.messages.create(
                model=settings.CLAUDE_MODEL,
                max_tokens=2000,
                messages=[{'role': 'user', 'content': prompt}]
            )
            result      = response.content[0].text
            tokens_used = response.usage.input_tokens + response.usage.output_tokens
            cost_usd    = (response.usage.input_tokens / 1_000_000 * 3) + (response.usage.output_tokens / 1_000_000 * 15)

            report.result       = result
            report.status       = 'completed'
            report.tokens_used  = tokens_used
            report.cost_usd     = round(cost_usd, 6)
            report.completed_at = timezone.now()
            report.save()
            return Response(AIReportSerializer(report).data, status=201)

        except Exception as e:
            report.status = 'failed'
            report.result = str(e)
            report.save()
            return Response({'detail': f'فشل الاتصال بـ Claude: {e}'}, status=500)
