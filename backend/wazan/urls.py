from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.reverse import reverse

@api_view(['GET'])
@permission_classes([AllowAny])
def api_root(request, format=None):
    return Response({
        'auth':          reverse('login', request=request, format=format),
        'farms':         request.build_absolute_uri('/api/v1/farms/'),
        'cycles':        request.build_absolute_uri('/api/v1/cycles/'),
        'operations':    request.build_absolute_uri('/api/v1/operations/'),
        'tasks':         request.build_absolute_uri('/api/v1/tasks/'),
        'conversations': request.build_absolute_uri('/api/v1/conversations/'),
        'finances':      request.build_absolute_uri('/api/v1/finances/'),
        'ai_reports':    request.build_absolute_uri('/api/v1/ai/'),
        'subscriptions': request.build_absolute_uri('/api/v1/subscriptions/'),
        'admin':         request.build_absolute_uri('/admin/'),
    })

urlpatterns = [
    path('api/v1/', api_root, name='api-root'),
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
