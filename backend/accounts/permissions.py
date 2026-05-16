from rest_framework.permissions import BasePermission


class IsOwnerOrManager(BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.role in ('owner', 'manager', 'admin')


class IsSupervisor(BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.is_supervisor


class SameOrganization(BasePermission):
    def has_object_permission(self, request, view, obj):
        org = getattr(obj, 'organization', None) or getattr(obj, 'farm', None)
        if org is None:
            return False
        org_id = getattr(org, 'organization_id', None) or getattr(org, 'id', None)
        return org_id == request.user.organization_id
