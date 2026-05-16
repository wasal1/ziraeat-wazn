from django.db import models
from farms.models import Farm, Field, Greenhouse
from accounts.models import User


class Crop(models.Model):
    CATEGORY = [
        ('vegetables', 'خضروات'),
        ('fruits',     'فواكه'),
        ('grains',     'حبوب'),
        ('herbs',      'أعشاب'),
        ('flowers',    'زهور'),
        ('other',      'أخرى'),
    ]

    name          = models.CharField(max_length=100)
    scientific    = models.CharField(max_length=150, blank=True)
    category      = models.CharField(max_length=20, choices=CATEGORY, default='other')
    avg_days      = models.PositiveIntegerField(null=True, blank=True, verbose_name='متوسط أيام النمو')
    notes         = models.TextField(blank=True)
    icon          = models.CharField(max_length=10, default='🌱')

    class Meta:
        verbose_name = 'محصول'
        verbose_name_plural = 'المحاصيل'
        ordering = ['name']

    def __str__(self):
        return self.name


class AgriculturalCycle(models.Model):
    STATUS = [
        ('planned',    'مخطط'),
        ('active',     'نشط'),
        ('harvesting', 'في مرحلة الحصاد'),
        ('completed',  'مكتمل'),
        ('cancelled',  'ملغي'),
    ]

    farm         = models.ForeignKey(Farm, on_delete=models.CASCADE, related_name='cycles')
    field        = models.ForeignKey(Field, on_delete=models.SET_NULL, null=True, blank=True, related_name='cycles')
    greenhouse   = models.ForeignKey(Greenhouse, on_delete=models.SET_NULL, null=True, blank=True, related_name='cycles')
    crop         = models.ForeignKey(Crop, on_delete=models.PROTECT)
    name         = models.CharField(max_length=200)
    status       = models.CharField(max_length=20, choices=STATUS, default='planned')
    start_date   = models.DateField()
    expected_end = models.DateField(null=True, blank=True)
    actual_end   = models.DateField(null=True, blank=True)
    area_ha      = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    plant_count  = models.PositiveIntegerField(null=True, blank=True)
    target_yield = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True, verbose_name='الإنتاج المستهدف (كجم)')
    actual_yield = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True, verbose_name='الإنتاج الفعلي (كجم)')
    notes        = models.TextField(blank=True)
    created_by   = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name='cycles_created')
    created_at   = models.DateTimeField(auto_now_add=True)
    updated_at   = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = 'دورة زراعية'
        verbose_name_plural = 'الدورات الزراعية'
        ordering = ['-start_date']

    def __str__(self):
        return f'{self.name} — {self.farm}'
