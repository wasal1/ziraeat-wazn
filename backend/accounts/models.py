from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager


class Organization(models.Model):
    """المؤسسة / العميل — كل عميل له مؤسسة منفصلة"""

    PLAN_CHOICES = [
        ('starter',      'باقة البداية'),
        ('professional', 'الباقة الاحترافية'),
        ('company',      'باقة الشركات'),
        ('enterprise',   'باقة المؤسسات'),
    ]

    name       = models.CharField(max_length=200, verbose_name='اسم المؤسسة')
    slug       = models.SlugField(unique=True, verbose_name='المعرف')
    phone      = models.CharField(max_length=20, blank=True)
    email      = models.EmailField(blank=True)
    address    = models.TextField(blank=True)
    logo       = models.ImageField(upload_to='orgs/logos/', null=True, blank=True)
    plan       = models.CharField(max_length=20, choices=PLAN_CHOICES, default='starter')
    is_active  = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = 'مؤسسة'
        verbose_name_plural = 'المؤسسات'
        ordering = ['-created_at']

    def __str__(self):
        return self.name


class UserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra):
        if not email:
            raise ValueError('البريد الإلكتروني مطلوب')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password, **extra):
        extra.setdefault('is_staff', True)
        extra.setdefault('is_superuser', True)
        return self.create_user(email, password, **extra)


class User(AbstractBaseUser, PermissionsMixin):
    """مستخدم المنصة — مرتبط بمؤسسة واحدة"""

    ROLE_CHOICES = [
        ('owner',      'مالك المزرعة'),
        ('manager',    'مدير المزرعة'),
        ('engineer',   'المهندس الزراعي'),
        ('supervisor', 'مشرف'),
        ('worker',     'عامل'),
        ('accountant', 'محاسب'),
        ('viewer',     'مشاهد فقط'),
        ('admin',      'مدير النظام'),
    ]

    email        = models.EmailField(unique=True, verbose_name='البريد الإلكتروني')
    full_name    = models.CharField(max_length=150, verbose_name='الاسم الكامل')
    phone        = models.CharField(max_length=20, blank=True)
    organization = models.ForeignKey(
        Organization, on_delete=models.CASCADE,
        related_name='users', null=True, blank=True,
        verbose_name='المؤسسة'
    )
    role        = models.CharField(max_length=20, choices=ROLE_CHOICES, default='worker')
    avatar      = models.ImageField(upload_to='users/avatars/', null=True, blank=True)
    is_active   = models.BooleanField(default=True)
    is_staff    = models.BooleanField(default=False)
    date_joined = models.DateTimeField(auto_now_add=True)

    objects = UserManager()

    USERNAME_FIELD  = 'email'
    REQUIRED_FIELDS = ['full_name']

    class Meta:
        verbose_name = 'مستخدم'
        verbose_name_plural = 'المستخدمون'

    def __str__(self):
        return f'{self.full_name} ({self.email})'

    @property
    def is_supervisor(self):
        return self.role in ('owner', 'manager', 'engineer', 'supervisor')
