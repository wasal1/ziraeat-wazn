from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Conversation, Message
from .serializers import ConversationSerializer, MessageSerializer


class ConversationListView(APIView):
    def get(self, request):
        qs = Conversation.objects.filter(organization=request.user.organization)
        return Response(ConversationSerializer(qs, many=True, context={'request': request}).data)

    def post(self, request):
        s = ConversationSerializer(data=request.data, context={'request': request})
        if s.is_valid():
            conv = s.save(organization=request.user.organization, created_by=request.user)
            conv.participants.add(request.user)
            return Response(ConversationSerializer(conv, context={'request': request}).data, status=201)
        return Response(s.errors, status=400)


class ConversationDetailView(APIView):
    def _get(self, pk, request):
        try:
            return Conversation.objects.get(pk=pk, organization=request.user.organization)
        except Conversation.DoesNotExist:
            return None

    def get(self, request, pk):
        obj = self._get(pk, request)
        return Response(ConversationSerializer(obj, context={'request': request}).data) if obj else Response({'detail': 'غير موجود'}, status=404)


class MessageListView(APIView):
    def get(self, request, pk):
        msgs = Message.objects.filter(conversation__pk=pk, conversation__organization=request.user.organization)
        msgs.exclude(sender=request.user).update(is_read=True)
        return Response(MessageSerializer(msgs, many=True).data)

    def post(self, request, pk):
        try:
            conv = Conversation.objects.get(pk=pk, organization=request.user.organization)
        except Conversation.DoesNotExist:
            return Response({'detail': 'غير موجود'}, status=404)
        s = MessageSerializer(data=request.data)
        if s.is_valid():
            s.save(conversation=conv, sender=request.user)
            conv.save()
            return Response(s.data, status=201)
        return Response(s.errors, status=400)
