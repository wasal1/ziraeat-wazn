from django.db import models
from farms.models import Farm
from accounts.models import User


class Task(models.Model):
    PRIORITY = [
        ('critical', 'حرج'),
        ('high',     'عالي'),
        ('medium',   'متوسط'),
        ('low',      'منخفض'),
    ]
    STATUS = [
        ('pending',     'معلق'),
        ('in_progress', 'جاري'),
        ('done',        'منجز'),
        ('cancelled',   'ملغي'),
        ('overdue',     'متأخر'),
    ]
    CATEGORY = [
        ('irrigation',    'ري'),
        ('fertilization', 'تسميد'),
        ('harvest',       'حصاد'),
        ('maintenance',   'صيانة'),
        ('inspection',    'فحص'),
        ('other',         'أخرى'),
    ]

    farm        = models.ForeignKey(Farm, on_delete=models.CASCADE, related_name='tasks')
    title       = models.CharField(max_length=300)
    description = models.TextField(blank=True)
    category    = models.CharField(max_length=20, choices=CATEGORY, default='other')
    priority    = models.CharField(max_length=20, choices=PRIORITY, default='medium')
    status      = models.CharField(max_length=20, choices=STATUS, default='pending')
    assigned_to = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name='tasks_assigned')
    created_by  = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name='tasks_created')
    due_date    = models.DateField(null=True, blank=True)
    done_at     = models.DateTimeField(null=True, blank=True)
    notes       = models.TextField(blank=True)
    created_at  = models.DateTimeField(auto_now_add=True)
    updated_at  = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = 'مهمة'
        verbose_name_plural = 'المهام'
        ordering = ['-created_at']

    def __str__(self):
        return self.title


class TaskComment(models.Model):
    task       = models.ForeignKey(Task, on_delete=models.CASCADE, related_name='comments')
    author     = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    body       = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['created_at']
