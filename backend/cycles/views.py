from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Crop, AgriculturalCycle
from .serializers import CropSerializer, CycleSerializer


class CropListView(APIView):
    def get(self, request):
        return Response(CropSerializer(Crop.objects.all(), many=True).data)


class CycleListView(APIView):
    def get(self, request):
        qs = AgriculturalCycle.objects.filter(farm__organization=request.user.organization)
        farm_id = request.query_params.get('farm')
        if farm_id:
            qs = qs.filter(farm_id=farm_id)
        status = request.query_params.get('status')
        if status:
            qs = qs.filter(status=status)
        return Response(CycleSerializer(qs, many=True).data)

    def post(self, request):
        s = CycleSerializer(data=request.data)
        if s.is_valid():
            s.save(created_by=request.user)
            return Response(s.data, status=201)
        return Response(s.errors, status=400)


class CycleDetailView(APIView):
    def _get(self, pk, request):
        try:
            return AgriculturalCycle.objects.get(pk=pk, farm__organization=request.user.organization)
        except AgriculturalCycle.DoesNotExist:
            return None

    def get(self, request, pk):
        obj = self._get(pk, request)
        return Response(CycleSerializer(obj).data) if obj else Response({'detail': 'غير موجود'}, status=404)

    def patch(self, request, pk):
        obj = self._get(pk, request)
        if not obj:
            return Response({'detail': 'غير موجود'}, status=404)
        s = CycleSerializer(obj, data=request.data, partial=True)
        if s.is_valid():
            s.save()
            return Response(s.data)
        return Response(s.errors, status=400)

    def delete(self, request, pk):
        obj = self._get(pk, request)
        if not obj:
            return Response({'detail': 'غير موجود'}, status=404)
        obj.status = 'cancelled'
        obj.save()
        return Response(status=204)
