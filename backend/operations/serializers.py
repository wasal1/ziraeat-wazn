from rest_framework import serializers
from .models import Operation, OperationAttachment


class AttachmentSerializer(serializers.ModelSerializer):
    class Meta:
        model  = OperationAttachment
        fields = ['id', 'file', 'caption', 'uploaded_at']


class OperationSerializer(serializers.ModelSerializer):
    op_type_display = serializers.CharField(source='get_op_type_display', read_only=True)
    status_display  = serializers.CharField(source='get_status_display', read_only=True)
    farm_name       = serializers.CharField(source='farm.name', read_only=True)
    performer_name  = serializers.CharField(source='performed_by.full_name', read_only=True)
    attachments     = AttachmentSerializer(many=True, read_only=True)

    class Meta:
        model  = Operation
        fields = ['id', 'farm', 'farm_name', 'field', 'greenhouse', 'cycle',
                  'op_type', 'op_type_display', 'status', 'status_display',
                  'date', 'duration_hrs', 'quantity', 'unit', 'cost',
                  'notes', 'performed_by', 'performer_name', 'attachments', 'created_at']
        read_only_fields = ['created_at', 'created_by']
