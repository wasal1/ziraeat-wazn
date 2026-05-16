from django.db import models
from accounts.models import Organization, User
from farms.models import Farm


class Conversation(models.Model):
    organization = models.ForeignKey(Organization, on_delete=models.CASCADE, related_name='conversations')
    farm         = models.ForeignKey(Farm, on_delete=models.SET_NULL, null=True, blank=True, related_name='conversations')
    title        = models.CharField(max_length=300, blank=True)
    participants = models.ManyToManyField(User, related_name='conversations')
    created_by   = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name='conversations_created')
    created_at   = models.DateTimeField(auto_now_add=True)
    updated_at   = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = 'محادثة'
        verbose_name_plural = 'المحادثات'
        ordering = ['-updated_at']

    def __str__(self):
        return self.title or f'محادثة #{self.pk}'


class Message(models.Model):
    conversation = models.ForeignKey(Conversation, on_delete=models.CASCADE, related_name='messages')
    sender       = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name='messages_sent')
    body         = models.TextField()
    attachment   = models.FileField(upload_to='conversations/attachments/', null=True, blank=True)
    is_read      = models.BooleanField(default=False)
    created_at   = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = 'رسالة'
        verbose_name_plural = 'الرسائل'
        ordering = ['created_at']

    def __str__(self):
        return f'{self.sender} → {self.conversation} @ {self.created_at:%Y-%m-%d %H:%M}'
