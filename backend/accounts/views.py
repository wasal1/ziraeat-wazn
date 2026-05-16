from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.tokens import RefreshToken

from .models import User
from .serializers import (
    RegisterSerializer, LoginSerializer, UserSerializer,
    OrganizationSerializer, InviteUserSerializer,
)


def get_tokens(user):
    refresh = RefreshToken.for_user(user)
    return {'refresh': str(refresh), 'access': str(refresh.access_token)}


class RegisterView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        s = RegisterSerializer(data=request.data)
        if s.is_valid():
            user = s.save()
            return Response({'tokens': get_tokens(user), 'user': UserSerializer(user).data}, status=201)
        return Response(s.errors, status=400)


class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        s = LoginSerializer(data=request.data)
        if s.is_valid():
            user = s.validated_data['user']
            return Response({'tokens': get_tokens(user), 'user': UserSerializer(user).data})
        return Response(s.errors, status=401)


class LogoutView(APIView):
    def post(self, request):
        try:
            RefreshToken(request.data.get('refresh', '')).blacklist()
        except Exception:
            pass
        return Response({'detail': 'تم تسجيل الخروج'})


class MeView(APIView):
    def get(self, request):
        return Response(UserSerializer(request.user).data)

    def patch(self, request):
        s = UserSerializer(request.user, data=request.data, partial=True)
        if s.is_valid():
            s.save()
            return Response(s.data)
        return Response(s.errors, status=400)


class OrganizationView(APIView):
    def get(self, request):
        return Response(OrganizationSerializer(request.user.organization).data)

    def patch(self, request):
        if request.user.role not in ('owner', 'manager', 'admin'):
            return Response({'detail': 'غير مصرح'}, status=403)
        s = OrganizationSerializer(request.user.organization, data=request.data, partial=True)
        if s.is_valid():
            s.save()
            return Response(s.data)
        return Response(s.errors, status=400)


class TeamListView(APIView):
    def get(self, request):
        users = User.objects.filter(organization=request.user.organization)
        return Response(UserSerializer(users, many=True).data)

    def post(self, request):
        if request.user.role not in ('owner', 'manager', 'admin'):
            return Response({'detail': 'غير مصرح'}, status=403)
        s = InviteUserSerializer(data=request.data)
        if s.is_valid():
            user = User.objects.create_user(
                email=s.validated_data['email'],
                password=s.validated_data['password'],
                full_name=s.validated_data['full_name'],
                phone=s.validated_data.get('phone', ''),
                role=s.validated_data['role'],
                organization=request.user.organization,
            )
            return Response(UserSerializer(user).data, status=201)
        return Response(s.errors, status=400)


class TeamMemberView(APIView):
    def _get_member(self, pk, org):
        try:
            return User.objects.get(pk=pk, organization=org)
        except User.DoesNotExist:
            return None

    def patch(self, request, pk):
        if request.user.role not in ('owner', 'manager', 'admin'):
            return Response({'detail': 'غير مصرح'}, status=403)
        user = self._get_member(pk, request.user.organization)
        if not user:
            return Response({'detail': 'المستخدم غير موجود'}, status=404)
        s = UserSerializer(user, data=request.data, partial=True)
        if s.is_valid():
            s.save()
            return Response(s.data)
        return Response(s.errors, status=400)

    def delete(self, request, pk):
        if request.user.role not in ('owner', 'admin'):
            return Response({'detail': 'غير مصرح'}, status=403)
        user = self._get_member(pk, request.user.organization)
        if not user:
            return Response({'detail': 'المستخدم غير موجود'}, status=404)
        user.is_active = False
        user.save()
        return Response(status=204)
