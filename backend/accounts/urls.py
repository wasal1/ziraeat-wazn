from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from . import views

urlpatterns = [
    path('register/',          views.RegisterView.as_view(),    name='register'),
    path('login/',             views.LoginView.as_view(),       name='login'),
    path('logout/',            views.LogoutView.as_view(),      name='logout'),
    path('token/refresh/',     TokenRefreshView.as_view(),      name='token-refresh'),
    path('me/',                views.MeView.as_view(),          name='me'),
    path('organization/',      views.OrganizationView.as_view(),name='organization'),
    path('team/',              views.TeamListView.as_view(),    name='team-list'),
    path('team/<int:pk>/',     views.TeamMemberView.as_view(),  name='team-member'),
]
