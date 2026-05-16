from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Farm, Field, Greenhouse
from .serializers import FarmSerializer, FarmDetailSerializer, FieldSerializer, GreenhouseSerializer


def org(request):
    return request.user.organization


class FarmListView(APIView):
    def get(self, request):
        farms = Farm.objects.filter(organization=org(request), is_active=True)
        return Response(FarmSerializer(farms, many=True).data)

    def post(self, request):
        s = FarmSerializer(data=request.data)
        if s.is_valid():
            s.save(organization=org(request))
            return Response(s.data, status=201)
        return Response(s.errors, status=400)


class FarmDetailView(APIView):
    def _get(self, pk, request):
        try:
            return Farm.objects.get(pk=pk, organization=org(request))
        except Farm.DoesNotExist:
            return None

    def get(self, request, pk):
        farm = self._get(pk, request)
        if not farm:
            return Response({'detail': 'غير موجود'}, status=404)
        return Response(FarmDetailSerializer(farm).data)

    def patch(self, request, pk):
        farm = self._get(pk, request)
        if not farm:
            return Response({'detail': 'غير موجود'}, status=404)
        s = FarmSerializer(farm, data=request.data, partial=True)
        if s.is_valid():
            s.save()
            return Response(s.data)
        return Response(s.errors, status=400)

    def delete(self, request, pk):
        farm = self._get(pk, request)
        if not farm:
            return Response({'detail': 'غير موجود'}, status=404)
        farm.is_active = False
        farm.save()
        return Response(status=204)


class FieldListView(APIView):
    def get(self, request, farm_pk):
        fields = Field.objects.filter(farm__pk=farm_pk, farm__organization=org(request))
        return Response(FieldSerializer(fields, many=True).data)

    def post(self, request, farm_pk):
        try:
            farm = Farm.objects.get(pk=farm_pk, organization=org(request))
        except Farm.DoesNotExist:
            return Response({'detail': 'المزرعة غير موجودة'}, status=404)
        s = FieldSerializer(data=request.data)
        if s.is_valid():
            s.save(farm=farm)
            return Response(s.data, status=201)
        return Response(s.errors, status=400)


class GreenhouseListView(APIView):
    def get(self, request, farm_pk):
        ghs = Greenhouse.objects.filter(farm__pk=farm_pk, farm__organization=org(request))
        return Response(GreenhouseSerializer(ghs, many=True).data)

    def post(self, request, farm_pk):
        try:
            farm = Farm.objects.get(pk=farm_pk, organization=org(request))
        except Farm.DoesNotExist:
            return Response({'detail': 'المزرعة غير موجودة'}, status=404)
        s = GreenhouseSerializer(data=request.data)
        if s.is_valid():
            s.save(farm=farm)
            return Response(s.data, status=201)
        return Response(s.errors, status=400)
