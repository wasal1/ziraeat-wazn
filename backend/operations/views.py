from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Operation
from .serializers import OperationSerializer


class OperationListView(APIView):
    def get(self, request):
        qs = Operation.objects.filter(farm__organization=request.user.organization)
        farm_id = request.query_params.get('farm')
        op_type = request.query_params.get('type')
        status  = request.query_params.get('status')
        if farm_id: qs = qs.filter(farm_id=farm_id)
        if op_type: qs = qs.filter(op_type=op_type)
        if status:  qs = qs.filter(status=status)
        return Response(OperationSerializer(qs, many=True).data)

    def post(self, request):
        s = OperationSerializer(data=request.data)
        if s.is_valid():
            s.save(created_by=request.user)
            return Response(s.data, status=201)
        return Response(s.errors, status=400)


class OperationDetailView(APIView):
    def _get(self, pk, request):
        try:
            return Operation.objects.get(pk=pk, farm__organization=request.user.organization)
        except Operation.DoesNotExist:
            return None

    def get(self, request, pk):
        obj = self._get(pk, request)
        return Response(OperationSerializer(obj).data) if obj else Response({'detail': 'غير موجود'}, status=404)

    def patch(self, request, pk):
        obj = self._get(pk, request)
        if not obj:
            return Response({'detail': 'غير موجود'}, status=404)
        s = OperationSerializer(obj, data=request.data, partial=True)
        if s.is_valid():
            s.save()
            return Response(s.data)
        return Response(s.errors, status=400)

    def delete(self, request, pk):
        obj = self._get(pk, request)
        if not obj:
            return Response({'detail': 'غير موجود'}, status=404)
        obj.delete()
        return Response(status=204)
