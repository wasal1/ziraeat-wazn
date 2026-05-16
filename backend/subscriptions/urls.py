from django.urls import path
from . import views

urlpatterns = [
    path('plans/',         views.PlanListView.as_view(),        name='plan-list'),
    path('current/',       views.CurrentSubscriptionView.as_view(), name='sub-current'),
    path('invoices/',      views.InvoiceListView.as_view(),     name='invoice-list'),
]
