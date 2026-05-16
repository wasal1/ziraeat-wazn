from django.db import models
from django.utils import timezone
from accounts.models import Organization


class Plan(models.Model):
    PLAN_IDS = [
        ('starter',      'باقة البداية'),
        ('professional', 'الباقة الاحترافية'),
        ('company',      'باقة الشركات'),
        ('enterprise',   'باقة المؤسسات'),
    ]

    id_key          = models.CharField(max_length=20, choices=PLAN_IDS, unique=True)
    name            = models.CharField(max_length=100)
    tagline         = models.CharField(max_length=200, blank=True)
    price_yearly    = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    max_farms       = models.PositiveIntegerField(null=True, blank=True)
    max_users       = models.PositiveIntegerField(null=True, blank=True)
    max_fields      = models.PositiveIntegerField(null=True, blank=True)
    max_greenhouses = models.PositiveIntegerField(null=True, blank=True)
    max_cycles      = models.PositiveIntegerField(null=True, blank=True)
    max_ai_reports  = models.PositiveIntegerField(null=True, blank=True)
    has_sensors     = models.BooleanField(default=False)
    has_cameras     = models.BooleanField(default=False)
    has_pumps       = models.BooleanField(default=False)
    has_ai          = models.BooleanField(default=False)
    is_active       = models.BooleanField(default=True)

    class Meta:
        verbose_name = 'باقة'
        verbose_name_plural = 'الباقات'

    def __str__(self):
        return self.name


class Subscription(models.Model):
    STATUS = [
        ('active',    'نشط'),
        ('trial',     'تجريبي'),
        ('expired',   'منتهي'),
        ('suspended', 'موقوف'),
    ]

    organization = models.OneToOneField(Organization, on_delete=models.CASCADE, related_name='subscription')
    plan         = models.ForeignKey(Plan, on_delete=models.PROTECT)
    status       = models.CharField(max_length=20, choices=STATUS, default='trial')
    start_date   = models.DateField()
    end_date     = models.DateField()
    auto_renew   = models.BooleanField(default=True)
    paid_amount  = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    ai_addon     = models.PositiveIntegerField(default=0)
    notes        = models.TextField(blank=True)
    created_at   = models.DateTimeField(auto_now_add=True)
    updated_at   = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = 'اشتراك'
        verbose_name_plural = 'الاشتراكات'

    def __str__(self):
        return f'{self.organization} — {self.plan}'

    @property
    def days_remaining(self):
        return max((self.end_date - timezone.now().date()).days, 0)

    @property
    def is_valid(self):
        return self.status == 'active' and self.days_remaining > 0


class Invoice(models.Model):
    STATUS = [('paid', 'مدفوعة'), ('pending', 'معلقة'), ('failed', 'فشل')]
    METHOD = [('card', 'بطاقة ائتمان'), ('bank_transfer', 'تحويل بنكي'), ('mada', 'مدى')]

    organization = models.ForeignKey(Organization, on_delete=models.CASCADE, related_name='invoices')
    subscription = models.ForeignKey(Subscription, on_delete=models.SET_NULL, null=True, related_name='invoices')
    amount       = models.DecimalField(max_digits=10, decimal_places=2)
    description  = models.CharField(max_length=200)
    status       = models.CharField(max_length=20, choices=STATUS, default='pending')
    method       = models.CharField(max_length=20, choices=METHOD, blank=True)
    ref_number   = models.CharField(max_length=100, blank=True)
    issued_at    = models.DateTimeField(auto_now_add=True)
    paid_at      = models.DateTimeField(null=True, blank=True)

    class Meta:
        verbose_name = 'فاتورة'
        verbose_name_plural = 'الفواتير'
        ordering = ['-issued_at']
