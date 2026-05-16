from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/v1/auth/',          include('accounts.urls')),
    path('api/v1/subscriptions/', include('subscriptions.urls')),
    path('api/v1/farms/',         include('farms.urls')),
    path('api/v1/cycles/',        include('cycles.urls')),
    path('api/v1/operations/',    include('operations.urls')),
    path('api/v1/tasks/',         include('tasks.urls')),
    path('api/v1/conversations/', include('conversations.urls')),
    path('api/v1/finances/',      include('finances.urls')),
    path('api/v1/ai/',            include('ai_reports.urls')),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
