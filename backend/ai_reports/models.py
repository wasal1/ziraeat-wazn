from django.db import models
from farms.models import Farm
from cycles.models import AgriculturalCycle
from accounts.models import User


class AIReport(models.Model):
    REPORT_TYPE = [
        ('weekly_summary',    'ملخص أسبوعي'),
        ('cycle_analysis',    'تحليل دورة زراعية'),
        ('cost_analysis',     'تحليل التكاليف'),
        ('pest_advice',       'نصيحة لمكافحة الآفات'),
        ('harvest_forecast',  'توقع الحصاد'),
        ('irrigation_plan',   'خطة ري'),
        ('general',           'عام'),
    ]
    STATUS = [
        ('pending',    'قيد الإنشاء'),
        ('completed',  'مكتمل'),
        ('failed',     'فشل'),
    ]

    farm        = models.ForeignKey(Farm, on_delete=models.CASCADE, related_name='ai_reports')
    cycle       = models.ForeignKey(AgriculturalCycle, on_delete=models.SET_NULL, null=True, blank=True, related_name='ai_reports')
    report_type = models.CharField(max_length=30, choices=REPORT_TYPE, default='general')
    status      = models.CharField(max_length=20, choices=STATUS, default='pending')
    prompt_used = models.TextField(blank=True)
    result      = models.TextField(blank=True)
    tokens_used = models.PositiveIntegerField(default=0)
    cost_usd    = models.DecimalField(max_digits=8, decimal_places=6, default=0)
    requested_by= models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name='ai_reports_requested')
    created_at  = models.DateTimeField(auto_now_add=True)
    completed_at= models.DateTimeField(null=True, blank=True)

    class Meta:
        verbose_name = 'تقرير ذكاء اصطناعي'
        verbose_name_plural = 'تقارير الذكاء الاصطناعي'
        ordering = ['-created_at']

    def __str__(self):
        return f'{self.get_report_type_display()} — {self.farm} — {self.created_at:%Y-%m-%d}'
