from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from .models import User


class UserAdminConfig(UserAdmin):
    ordering = ('-created_at', 'username')
    list_display = ('username', 'email', 'is_active', 'is_staff')
    search_fields = ('username', 'email')
    list_filter = ('is_active', 'is_staff', 'is_superuser')
    fieldsets = (
        (
            'Account',
            {
                'fields': (
                    'username',
                    'email',
                    'password'
                )
            }
        ),
        (
            'Account',
            {
                'fields': (
                    'first_name',
                    'last_name',
                    'about'
                )
            }
        ),
        (
            'Permissions',
            {
                'fields': (
                    'is_staff',
                    'is_active',
                    'is_superuser'
                )
            }
        )
    )
    add_fieldsets = (
        (
            'Account',
            {
                'fields': (
                    'username',
                    'email',
                    'password1',
                    'password2'
                )
            }
        ),
        (
            'Permissions',
            {
                'fields': (
                    'is_staff',
                    'is_active',
                    'is_superuser'
                )
            }
        )
    )


admin.site.register(User, UserAdminConfig)
