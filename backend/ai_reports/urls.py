from django.urls import path
from . import views

urlpatterns = [
    path('reports/',          views.AIReportListView.as_view(),    name='ai-report-list'),
    path('reports/<int:pk>/', views.AIReportDetailView.as_view(),  name='ai-report-detail'),
    path('generate/',         views.GenerateReportView.as_view(),  name='ai-generate'),
]
