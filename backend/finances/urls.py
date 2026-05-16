from django.urls import path
from . import views

urlpatterns = [
    path('expenses/',          views.ExpenseListView.as_view(),   name='expense-list'),
    path('expenses/<int:pk>/', views.ExpenseDetailView.as_view(), name='expense-detail'),
    path('sales/',             views.SaleListView.as_view(),      name='sale-list'),
    path('sales/<int:pk>/',    views.SaleDetailView.as_view(),    name='sale-detail'),
    path('summary/',           views.FinanceSummaryView.as_view(),name='finance-summary'),
]
