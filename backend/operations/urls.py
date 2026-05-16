from django.urls import path
from . import views

urlpatterns = [
    path('',          views.OperationListView.as_view(),   name='operation-list'),
    path('<int:pk>/', views.OperationDetailView.as_view(), name='operation-detail'),
]
