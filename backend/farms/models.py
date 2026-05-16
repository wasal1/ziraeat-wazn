from django.db import models
from accounts.models import Organization, User


class Farm(models.Model):
    organization = models.ForeignKey(Organization, on_delete=models.CASCADE, related_name='farms')
    name         = models.CharField(max_length=200, verbose_name='اسم المزرعة')
    location     = models.CharField(max_length=300, blank=True)
    area_ha      = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True, verbose_name='المساحة (هكتار)')
    latitude     = models.FloatField(null=True, blank=True)
    longitude    = models.FloatField(null=True, blank=True)
    notes        = models.TextField(blank=True)
    is_active    = models.BooleanField(default=True)
    created_at   = models.DateTimeField(auto_now_add=True)
    updated_at   = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = 'مزرعة'
        verbose_name_plural = 'المزارع'
        ordering = ['name']

    def __str__(self):
        return f'{self.name} — {self.organization}'


class Field(models.Model):
    SOIL_TYPES = [
        ('sandy',  'رملية'),
        ('loamy',  'طينية رملية'),
        ('clay',   'طينية'),
        ('silty',  'طمية'),
        ('rocky',  'صخرية'),
    ]

    farm      = models.ForeignKey(Farm, on_delete=models.CASCADE, related_name='fields')
    name      = models.CharField(max_length=200)
    area_ha   = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    soil_type = models.CharField(max_length=20, choices=SOIL_TYPES, blank=True)
    notes     = models.TextField(blank=True)
    is_active = models.BooleanField(default=True)

    class Meta:
        verbose_name = 'حقل'
        verbose_name_plural = 'الحقول'

    def __str__(self):
        return f'{self.name} — {self.farm}'


class Greenhouse(models.Model):
    TYPE_CHOICES = [
        ('standard', 'عادي'),
        ('cooled',   'مكيف'),
        ('shaded',   'مظلل'),
        ('tunnel',   'نفق'),
    ]

    farm       = models.ForeignKey(Farm, on_delete=models.CASCADE, related_name='greenhouses')
    name       = models.CharField(max_length=200)
    gh_type    = models.CharField(max_length=20, choices=TYPE_CHOICES, default='standard')
    area_sqm   = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    capacity   = models.PositiveIntegerField(null=True, blank=True, verbose_name='السعة (شتلة)')
    notes      = models.TextField(blank=True)
    is_active  = models.BooleanField(default=True)

    class Meta:
        verbose_name = 'بيت محمي'
        verbose_name_plural = 'البيوت المحمية'

    def __str__(self):
        return f'{self.name} — {self.farm}'
