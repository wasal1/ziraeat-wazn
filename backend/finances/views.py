from rest_framework.views import APIView
from rest_framework.response import Response
from django.db.models import Sum
from .models import Expense, Sale
from .serializers import ExpenseSerializer, SaleSerializer


class ExpenseListView(APIView):
    def get(self, request):
        qs = Expense.objects.filter(farm__organization=request.user.organization)
        if request.query_params.get('farm'):   qs = qs.filter(farm_id=request.query_params['farm'])
        if request.query_params.get('cycle'):  qs = qs.filter(cycle_id=request.query_params['cycle'])
        if request.query_params.get('category'): qs = qs.filter(category=request.query_params['category'])
        return Response(ExpenseSerializer(qs, many=True).data)

    def post(self, request):
        s = ExpenseSerializer(data=request.data)
        if s.is_valid():
            s.save(created_by=request.user)
            return Response(s.data, status=201)
        return Response(s.errors, status=400)


class ExpenseDetailView(APIView):
    def _get(self, pk, request):
        try:
            return Expense.objects.get(pk=pk, farm__organization=request.user.organization)
        except Expense.DoesNotExist:
            return None

    def get(self, request, pk):
        obj = self._get(pk, request)
        return Response(ExpenseSerializer(obj).data) if obj else Response({'detail': 'غير موجود'}, status=404)

    def patch(self, request, pk):
        obj = self._get(pk, request)
        if not obj: return Response({'detail': 'غير موجود'}, status=404)
        s = ExpenseSerializer(obj, data=request.data, partial=True)
        if s.is_valid():
            s.save()
            return Response(s.data)
        return Response(s.errors, status=400)

    def delete(self, request, pk):
        obj = self._get(pk, request)
        if not obj: return Response({'detail': 'غير موجود'}, status=404)
        obj.delete()
        return Response(status=204)


class SaleListView(APIView):
    def get(self, request):
        qs = Sale.objects.filter(farm__organization=request.user.organization)
        if request.query_params.get('farm'):  qs = qs.filter(farm_id=request.query_params['farm'])
        if request.query_params.get('cycle'): qs = qs.filter(cycle_id=request.query_params['cycle'])
        return Response(SaleSerializer(qs, many=True).data)

    def post(self, request):
        s = SaleSerializer(data=request.data)
        if s.is_valid():
            s.save(created_by=request.user)
            return Response(s.data, status=201)
        return Response(s.errors, status=400)


class SaleDetailView(APIView):
    def _get(self, pk, request):
        try:
            return Sale.objects.get(pk=pk, farm__organization=request.user.organization)
        except Sale.DoesNotExist:
            return None

    def get(self, request, pk):
        obj = self._get(pk, request)
        return Response(SaleSerializer(obj).data) if obj else Response({'detail': 'غير موجود'}, status=404)

    def patch(self, request, pk):
        obj = self._get(pk, request)
        if not obj: return Response({'detail': 'غير موجود'}, status=404)
        s = SaleSerializer(obj, data=request.data, partial=True)
        if s.is_valid():
            s.save()
            return Response(s.data)
        return Response(s.errors, status=400)

    def delete(self, request, pk):
        obj = self._get(pk, request)
        if not obj: return Response({'detail': 'غير موجود'}, status=404)
        obj.delete()
        return Response(status=204)


class FinanceSummaryView(APIView):
    def get(self, request):
        org = request.user.organization
        total_expenses = Expense.objects.filter(farm__organization=org).aggregate(t=Sum('amount'))['t'] or 0
        total_sales    = Sale.objects.filter(farm__organization=org).aggregate(t=Sum('total_amount'))['t'] or 0
        return Response({
            'total_expenses': total_expenses,
            'total_sales':    total_sales,
            'net_profit':     total_sales - total_expenses,
        })
