from django.db import models
from farms.models import Farm
from cycles.models import AgriculturalCycle
from accounts.models import User


class Expense(models.Model):
    CATEGORY = [
        ('labor',        'عمالة'),
        ('seeds',        'بذور وشتلات'),
        ('fertilizer',   'أسمدة'),
        ('pesticide',    'مبيدات'),
        ('water',        'مياه'),
        ('electricity',  'كهرباء'),
        ('fuel',         'وقود'),
        ('equipment',    'معدات'),
        ('maintenance',  'صيانة'),
        ('transport',    'نقل'),
        ('packaging',    'تعبئة وتغليف'),
        ('other',        'أخرى'),
    ]

    farm       = models.ForeignKey(Farm, on_delete=models.CASCADE, related_name='expenses')
    cycle      = models.ForeignKey(AgriculturalCycle, on_delete=models.SET_NULL, null=True, blank=True, related_name='expenses')
    category   = models.CharField(max_length=20, choices=CATEGORY)
    description= models.CharField(max_length=300)
    amount     = models.DecimalField(max_digits=12, decimal_places=2)
    date       = models.DateField()
    receipt    = models.FileField(upload_to='finances/receipts/', null=True, blank=True)
    notes      = models.TextField(blank=True)
    created_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name='expenses_created')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = 'مصروف'
        verbose_name_plural = 'المصروفات'
        ordering = ['-date']

    def __str__(self):
        return f'{self.get_category_display()} — {self.amount} ريال — {self.date}'


class Sale(models.Model):
    BUYER_TYPE = [
        ('market',     'سوق'),
        ('wholesaler', 'جملة'),
        ('retailer',   'تجزئة'),
        ('direct',     'مباشر'),
        ('export',     'تصدير'),
        ('other',      'أخرى'),
    ]

    farm        = models.ForeignKey(Farm, on_delete=models.CASCADE, related_name='sales')
    cycle       = models.ForeignKey(AgriculturalCycle, on_delete=models.SET_NULL, null=True, blank=True, related_name='sales')
    product     = models.CharField(max_length=200)
    quantity_kg = models.DecimalField(max_digits=10, decimal_places=2)
    price_per_kg= models.DecimalField(max_digits=8, decimal_places=2)
    total_amount= models.DecimalField(max_digits=12, decimal_places=2)
    buyer_type  = models.CharField(max_length=20, choices=BUYER_TYPE, default='market')
    buyer_name  = models.CharField(max_length=200, blank=True)
    date        = models.DateField()
    notes       = models.TextField(blank=True)
    created_by  = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name='sales_created')
    created_at  = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = 'عملية بيع'
        verbose_name_plural = 'المبيعات'
        ordering = ['-date']

    def save(self, *args, **kwargs):
        self.total_amount = self.quantity_kg * self.price_per_kg
        super().save(*args, **kwargs)

    def __str__(self):
        return f'{self.product} — {self.total_amount} ريال — {self.date}'
