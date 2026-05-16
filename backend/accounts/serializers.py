from rest_framework import serializers
from django.contrib.auth import authenticate
from .models import User, Organization


class OrganizationSerializer(serializers.ModelSerializer):
    class Meta:
        model  = Organization
        fields = ['id', 'name', 'slug', 'phone', 'email', 'plan', 'is_active', 'logo']


class UserSerializer(serializers.ModelSerializer):
    organization = OrganizationSerializer(read_only=True)

    class Meta:
        model  = User
        fields = ['id', 'email', 'full_name', 'phone', 'role', 'avatar', 'organization', 'date_joined']
        read_only_fields = ['date_joined']


class RegisterSerializer(serializers.Serializer):
    org_name  = serializers.CharField(max_length=200)
    org_slug  = serializers.SlugField(max_length=50)
    email     = serializers.EmailField()
    full_name = serializers.CharField(max_length=150)
    phone     = serializers.CharField(max_length=20, required=False, allow_blank=True)
    password  = serializers.CharField(min_length=8, write_only=True)

    def validate_email(self, value):
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError('هذا البريد الإلكتروني مسجل مسبقاً')
        return value

    def validate_org_slug(self, value):
        if Organization.objects.filter(slug=value).exists():
            raise serializers.ValidationError('هذا المعرف محجوز، اختر معرفاً آخر')
        return value

    def create(self, validated_data):
        org = Organization.objects.create(
            name=validated_data['org_name'],
            slug=validated_data['org_slug'],
        )
        user = User.objects.create_user(
            email=validated_data['email'],
            password=validated_data['password'],
            full_name=validated_data['full_name'],
            phone=validated_data.get('phone', ''),
            organization=org,
            role='owner',
        )
        return user


class LoginSerializer(serializers.Serializer):
    email    = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        user = authenticate(username=data['email'], password=data['password'])
        if not user:
            raise serializers.ValidationError('بيانات الدخول غير صحيحة')
        if not user.is_active:
            raise serializers.ValidationError('الحساب موقوف')
        data['user'] = user
        return data


class InviteUserSerializer(serializers.Serializer):
    email     = serializers.EmailField()
    full_name = serializers.CharField(max_length=150)
    phone     = serializers.CharField(max_length=20, required=False, allow_blank=True)
    role      = serializers.ChoiceField(choices=User.ROLE_CHOICES)
    password  = serializers.CharField(min_length=8, write_only=True)

    def validate_email(self, value):
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError('هذا البريد الإلكتروني مسجل مسبقاً')
        return value
