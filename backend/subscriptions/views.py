from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import serializers
from .models import Plan, Subscription, Invoice


class PlanSerializer(serializers.ModelSerializer):
    class Meta:
        model  = Plan
        fields = '__all__'


class SubscriptionSerializer(serializers.ModelSerializer):
    plan_name     = serializers.CharField(source='plan.name', read_only=True)
    days_remaining = serializers.IntegerField(read_only=True)
    is_valid      = serializers.BooleanField(read_only=True)

    class Meta:
        model  = Subscription
        fields = ['id', 'plan', 'plan_name', 'status', 'start_date', 'end_date',
                  'auto_renew', 'paid_amount', 'ai_addon', 'days_remaining', 'is_valid']


class InvoiceSerializer(serializers.ModelSerializer):
    class Meta:
        model  = Invoice
        fields = ['id', 'amount', 'description', 'status', 'method', 'ref_number', 'issued_at', 'paid_at']


class PlanListView(APIView):
    permission_classes = []

    def get(self, request):
        plans = Plan.objects.filter(is_active=True)
        return Response(PlanSerializer(plans, many=True).data)


class CurrentSubscriptionView(APIView):
    def get(self, request):
        try:
            sub = request.user.organization.subscription
            return Response(SubscriptionSerializer(sub).data)
        except Subscription.DoesNotExist:
            return Response({'detail': 'لا يوجد اشتراك'}, status=404)


class InvoiceListView(APIView):
    def get(self, request):
        invoices = Invoice.objects.filter(organization=request.user.organization)
        return Response(InvoiceSerializer(invoices, many=True).data)
