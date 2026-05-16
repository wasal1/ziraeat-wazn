from rest_framework import serializers
from .models import Crop, AgriculturalCycle


class CropSerializer(serializers.ModelSerializer):
    class Meta:
        model  = Crop
        fields = '__all__'


class CycleSerializer(serializers.ModelSerializer):
    crop_name  = serializers.CharField(source='crop.name', read_only=True)
    farm_name  = serializers.CharField(source='farm.name', read_only=True)
    progress   = serializers.SerializerMethodField()

    class Meta:
        model  = AgriculturalCycle
        fields = ['id', 'farm', 'farm_name', 'field', 'greenhouse', 'crop', 'crop_name',
                  'name', 'status', 'start_date', 'expected_end', 'actual_end',
                  'area_ha', 'plant_count', 'target_yield', 'actual_yield',
                  'notes', 'progress', 'created_at']
        read_only_fields = ['created_at']

    def get_progress(self, obj):
        from django.utils import timezone
        if obj.status == 'completed':
            return 100
        if not obj.expected_end:
            return 0
        today = timezone.now().date()
        total = (obj.expected_end - obj.start_date).days
        done  = (today - obj.start_date).days
        if total <= 0:
            return 0
        return min(round(done / total * 100), 100)
