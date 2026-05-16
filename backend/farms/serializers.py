from rest_framework import serializers
from .models import Farm, Field, Greenhouse


class FieldSerializer(serializers.ModelSerializer):
    class Meta:
        model  = Field
        fields = '__all__'
        read_only_fields = ['farm']


class GreenhouseSerializer(serializers.ModelSerializer):
    class Meta:
        model  = Greenhouse
        fields = '__all__'
        read_only_fields = ['farm']


class FarmSerializer(serializers.ModelSerializer):
    fields_count      = serializers.IntegerField(source='fields.count', read_only=True)
    greenhouses_count = serializers.IntegerField(source='greenhouses.count', read_only=True)

    class Meta:
        model  = Farm
        fields = ['id', 'name', 'location', 'area_ha', 'latitude', 'longitude',
                  'notes', 'is_active', 'fields_count', 'greenhouses_count', 'created_at']
        read_only_fields = ['organization', 'created_at']


class FarmDetailSerializer(FarmSerializer):
    fields_list      = FieldSerializer(source='fields', many=True, read_only=True)
    greenhouses_list = GreenhouseSerializer(source='greenhouses', many=True, read_only=True)

    class Meta(FarmSerializer.Meta):
        fields = FarmSerializer.Meta.fields + ['fields_list', 'greenhouses_list']
