from django.utils.translation import gettext_lazy as _
from django.db.models import (
    CASCADE,
    Model,
    DateTimeField,
    CharField,
    ForeignKey,
    ManyToManyField
)

from users.models import User
from tags.models import Tag


class Producer(Model):
    modified_at = DateTimeField(
        _('Modified at'),
        auto_now=True
    )
    name = CharField(
        _('Name'),
        unique=True,
        max_length=100
    )
    user = ForeignKey(
        User,
        null=True,
        on_delete=CASCADE,
        related_name='producers'
    )
    country = CharField(
        _('Country'),
        max_length=100
    )
    region = CharField(
        _('Region'),
        max_length=100
    )

    def __str__(self):
        return self.name
