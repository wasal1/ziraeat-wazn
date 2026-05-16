from rest_framework import serializers
from .models import Conversation, Message


class MessageSerializer(serializers.ModelSerializer):
    sender_name = serializers.CharField(source='sender.full_name', read_only=True)

    class Meta:
        model  = Message
        fields = ['id', 'body', 'attachment', 'sender', 'sender_name', 'is_read', 'created_at']
        read_only_fields = ['sender', 'created_at']


class ConversationSerializer(serializers.ModelSerializer):
    last_message    = serializers.SerializerMethodField()
    unread_count    = serializers.SerializerMethodField()
    participants_count = serializers.IntegerField(source='participants.count', read_only=True)

    class Meta:
        model  = Conversation
        fields = ['id', 'title', 'farm', 'participants', 'participants_count',
                  'last_message', 'unread_count', 'created_at', 'updated_at']
        read_only_fields = ['created_by', 'created_at', 'updated_at']

    def get_last_message(self, obj):
        msg = obj.messages.last()
        return MessageSerializer(msg).data if msg else None

    def get_unread_count(self, obj):
        user = self.context.get('request').user if self.context.get('request') else None
        if not user:
            return 0
        return obj.messages.filter(is_read=False).exclude(sender=user).count()
