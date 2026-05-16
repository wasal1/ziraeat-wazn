from django.urls import path
from . import views

urlpatterns = [
    path('crops/',         views.CropListView.as_view(),    name='crop-list'),
    path('',               views.CycleListView.as_view(),   name='cycle-list'),
    path('<int:pk>/',      views.CycleDetailView.as_view(), name='cycle-detail'),
]
