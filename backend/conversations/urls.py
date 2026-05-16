from django.urls import path
from . import views

urlpatterns = [
    path('',                              views.ConversationListView.as_view(),  name='conversation-list'),
    path('<int:pk>/',                     views.ConversationDetailView.as_view(),name='conversation-detail'),
    path('<int:pk>/messages/',            views.MessageListView.as_view(),       name='message-list'),
]
