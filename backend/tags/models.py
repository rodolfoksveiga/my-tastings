from django.utils.translation import gettext_lazy as _
from django.db.models import (
    CASCADE,
    Model,
    DateTimeField,
    CharField,
    ForeignKey
)

from users.models import User


class Tag(Model):
    modified_at = DateTimeField(
        _('Modified at'),
        auto_now=True
    )
    name = CharField(
        _('Name'),
        unique=True,
        max_length=200
    )
    user = ForeignKey(
        User,
        null=True,
        on_delete=CASCADE,
        related_name='tags'
    )

    def __str__(self):
        return self.name
