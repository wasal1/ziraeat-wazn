from django.urls import path
from . import views

urlpatterns = [
    path('',                              views.FarmListView.as_view(),        name='farm-list'),
    path('<int:pk>/',                     views.FarmDetailView.as_view(),      name='farm-detail'),
    path('<int:farm_pk>/fields/',         views.FieldListView.as_view(),       name='field-list'),
    path('<int:farm_pk>/greenhouses/',    views.GreenhouseListView.as_view(),  name='greenhouse-list'),
]
