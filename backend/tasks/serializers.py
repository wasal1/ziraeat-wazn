from rest_framework import serializers
from .models import Task, TaskComment


class TaskCommentSerializer(serializers.ModelSerializer):
    author_name = serializers.CharField(source='author.full_name', read_only=True)

    class Meta:
        model  = TaskComment
        fields = ['id', 'body', 'author', 'author_name', 'created_at']
        read_only_fields = ['author', 'created_at']


class TaskSerializer(serializers.ModelSerializer):
    assigned_name  = serializers.CharField(source='assigned_to.full_name', read_only=True)
    farm_name      = serializers.CharField(source='farm.name', read_only=True)
    priority_label = serializers.CharField(source='get_priority_display', read_only=True)
    status_label   = serializers.CharField(source='get_status_display', read_only=True)
    comments       = TaskCommentSerializer(many=True, read_only=True)

    class Meta:
        model  = Task
        fields = ['id', 'farm', 'farm_name', 'title', 'description', 'category',
                  'priority', 'priority_label', 'status', 'status_label',
                  'assigned_to', 'assigned_name', 'due_date', 'done_at',
                  'notes', 'comments', 'created_at']
        read_only_fields = ['created_by', 'created_at']
