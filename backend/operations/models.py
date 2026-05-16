from django.db import models
from farms.models import Farm, Field, Greenhouse
from cycles.models import AgriculturalCycle
from accounts.models import User


class Operation(models.Model):
    TYPE_CHOICES = [
        ('irrigation',    'ري'),
        ('fertilization', 'تسميد'),
        ('harvest',       'حصاد'),
        ('pest_control',  'مكافحة آفات'),
        ('planting',      'زراعة'),
        ('pruning',       'تقليم'),
        ('soil_prep',     'تحضير التربة'),
        ('other',         'أخرى'),
    ]

    STATUS = [
        ('planned',     'مخطط'),
        ('in_progress', 'جاري'),
        ('done',        'منتهي'),
        ('cancelled',   'ملغي'),
    ]

    farm         = models.ForeignKey(Farm, on_delete=models.CASCADE, related_name='operations')
    field        = models.ForeignKey(Field, on_delete=models.SET_NULL, null=True, blank=True)
    greenhouse   = models.ForeignKey(Greenhouse, on_delete=models.SET_NULL, null=True, blank=True)
    cycle        = models.ForeignKey(AgriculturalCycle, on_delete=models.SET_NULL, null=True, blank=True, related_name='operations')
    op_type      = models.CharField(max_length=20, choices=TYPE_CHOICES)
    status       = models.CharField(max_length=20, choices=STATUS, default='planned')
    date         = models.DateField()
    duration_hrs = models.DecimalField(max_digits=5, decimal_places=1, null=True, blank=True)
    quantity     = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    unit         = models.CharField(max_length=20, blank=True)
    cost         = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    notes        = models.TextField(blank=True)
    performed_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name='operations')
    created_by   = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name='operations_created')
    created_at   = models.DateTimeField(auto_now_add=True)
    updated_at   = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = 'عملية زراعية'
        verbose_name_plural = 'العمليات الزراعية'
        ordering = ['-date', '-created_at']

    def __str__(self):
        return f'{self.get_op_type_display()} — {self.farm} — {self.date}'


class OperationAttachment(models.Model):
    operation = models.ForeignKey(Operation, on_delete=models.CASCADE, related_name='attachments')
    file      = models.FileField(upload_to='operations/attachments/')
    caption   = models.CharField(max_length=200, blank=True)
    uploaded_at = models.DateTimeField(auto_now_add=True)
