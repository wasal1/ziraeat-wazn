from rest_framework import serializers
from .models import Expense, Sale


class ExpenseSerializer(serializers.ModelSerializer):
    category_label = serializers.CharField(source='get_category_display', read_only=True)
    farm_name      = serializers.CharField(source='farm.name', read_only=True)

    class Meta:
        model  = Expense
        fields = ['id', 'farm', 'farm_name', 'cycle', 'category', 'category_label',
                  'description', 'amount', 'date', 'receipt', 'notes', 'created_at']
        read_only_fields = ['created_by', 'created_at']


class SaleSerializer(serializers.ModelSerializer):
    farm_name = serializers.CharField(source='farm.name', read_only=True)

    class Meta:
        model  = Sale
        fields = ['id', 'farm', 'farm_name', 'cycle', 'product', 'quantity_kg',
                  'price_per_kg', 'total_amount', 'buyer_type', 'buyer_name',
                  'date', 'notes', 'created_at']
        read_only_fields = ['total_amount', 'created_by', 'created_at']
