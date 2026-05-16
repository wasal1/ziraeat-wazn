from rest_framework.views import APIView
from rest_framework.response import Response
from django.utils import timezone
from .models import Task, TaskComment
from .serializers import TaskSerializer, TaskCommentSerializer


class TaskListView(APIView):
    def get(self, request):
        qs = Task.objects.filter(farm__organization=request.user.organization)
        if request.query_params.get('farm'):
            qs = qs.filter(farm_id=request.query_params['farm'])
        if request.query_params.get('status'):
            qs = qs.filter(status=request.query_params['status'])
        if request.query_params.get('assigned_to'):
            qs = qs.filter(assigned_to=request.user)
        return Response(TaskSerializer(qs, many=True).data)

    def post(self, request):
        s = TaskSerializer(data=request.data)
        if s.is_valid():
            s.save(created_by=request.user)
            return Response(s.data, status=201)
        return Response(s.errors, status=400)


class TaskDetailView(APIView):
    def _get(self, pk, request):
        try:
            return Task.objects.get(pk=pk, farm__organization=request.user.organization)
        except Task.DoesNotExist:
            return None

    def get(self, request, pk):
        obj = self._get(pk, request)
        return Response(TaskSerializer(obj).data) if obj else Response({'detail': 'غير موجود'}, status=404)

    def patch(self, request, pk):
        obj = self._get(pk, request)
        if not obj:
            return Response({'detail': 'غير موجود'}, status=404)
        s = TaskSerializer(obj, data=request.data, partial=True)
        if s.is_valid():
            if s.validated_data.get('status') == 'done' and not obj.done_at:
                obj.done_at = timezone.now()
            s.save()
            return Response(s.data)
        return Response(s.errors, status=400)

    def delete(self, request, pk):
        obj = self._get(pk, request)
        if not obj:
            return Response({'detail': 'غير موجود'}, status=404)
        obj.status = 'cancelled'
        obj.save()
        return Response(status=204)


class TaskCommentView(APIView):
    def get(self, request, pk):
        comments = TaskComment.objects.filter(task__pk=pk, task__farm__organization=request.user.organization)
        return Response(TaskCommentSerializer(comments, many=True).data)

    def post(self, request, pk):
        try:
            task = Task.objects.get(pk=pk, farm__organization=request.user.organization)
        except Task.DoesNotExist:
            return Response({'detail': 'غير موجود'}, status=404)
        s = TaskCommentSerializer(data=request.data)
        if s.is_valid():
            s.save(task=task, author=request.user)
            return Response(s.data, status=201)
        return Response(s.errors, status=400)
