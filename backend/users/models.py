from django.utils.translation import gettext_lazy as _
from django.db.models import (
    EmailField,
    CharField,
    DateTimeField,
    TextField,
    BooleanField
)
from django.contrib.auth.models import (
    AbstractBaseUser,
    PermissionsMixin,
    BaseUserManager
)


class UserAccountManager(BaseUserManager):
    def create_user(self, username, email, password, **other_fields):
        if not username:
            raise ValueError(_('Users must provide an username.'))

        if not email:
            raise ValueError(_('Users must provide an email address.'))

        email = self.normalize_email(email)
        user = self.model(username=username, email=email, **other_fields)
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, username, email, password, **other_fields):
        other_fields.setdefault('is_staff', True)
        other_fields.setdefault('is_superuser', True)

        if other_fields.get('is_staff') is not True:
            raise ValueError(
                _('Super users must be assigned to "is_staff = True"'))

        if other_fields.get('is_superuser') is not True:
            raise ValueError(
                _('Super users must be assigned to "is_superuser = True"'))

        user = self.create_user(username, email, password, **other_fields)
        return user


class User(AbstractBaseUser, PermissionsMixin):
    objects = UserAccountManager()

    created_at = DateTimeField(
        _('Created at'),
        auto_now_add=True
    )
    username = CharField(
        _('Username'),
        max_length=150,
        unique=True
    )
    email = EmailField(
        _('Email'),
        unique=True
    )
    first_name = CharField(
        _('First name'),
        max_length=150,
        blank=True
    )
    last_name = CharField(
        _('Last name'),
        max_length=150,
        blank=True
    )
    about = TextField(
        _('About'),
        max_length=500,
        blank=True
    )
    is_active = BooleanField(
        default=True
    )
    is_staff = BooleanField(
        default=False
    )

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['email']

    def __str__(self):
        return self.username
