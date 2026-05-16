from django.urls import path
from . import views

urlpatterns = [
    path('',                       views.TaskListView.as_view(),    name='task-list'),
    path('<int:pk>/',              views.TaskDetailView.as_view(),  name='task-detail'),
    path('<int:pk>/comments/',     views.TaskCommentView.as_view(), name='task-comments'),
]
