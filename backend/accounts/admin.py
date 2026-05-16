from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import User, Organization


@admin.register(Organization)
class OrganizationAdmin(admin.ModelAdmin):
    list_display  = ['name', 'slug', 'plan', 'is_active', 'created_at']
    list_filter   = ['plan', 'is_active']
    search_fields = ['name', 'slug', 'email']


@admin.register(User)
class UserAdmin(BaseUserAdmin):
    list_display  = ['email', 'full_name', 'role', 'organization', 'is_active']
    list_filter   = ['role', 'is_active', 'organization']
    search_fields = ['email', 'full_name']
    ordering      = ['-date_joined']
    fieldsets = (
        (None,         {'fields': ('email', 'password')}),
        ('المعلومات',  {'fields': ('full_name', 'phone', 'avatar', 'organization', 'role')}),
        ('الصلاحيات',  {'fields': ('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions')}),
    )
    add_fieldsets = (
        (None, {'classes': ('wide',), 'fields': ('email', 'full_name', 'password1', 'password2', 'organization', 'role')}),
    )
