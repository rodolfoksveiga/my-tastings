from django.utils.translation import gettext_lazy as _
from django.db.models import (
    Model,
    DateTimeField,
    CharField
)


class Category(Model):
    created_at = DateTimeField(
        _('Created at'),
        auto_now_add=True
    )
    name = CharField(
        _('Name'),
        max_length=100
    )

    def __str__(self):
        return self.name
