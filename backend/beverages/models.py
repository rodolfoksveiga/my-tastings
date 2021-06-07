import datetime
from django.utils.translation import gettext_lazy as _
from django.db.models import (
    SET_NULL,
    CASCADE,
    Model,
    DateTimeField,
    CharField,
    ForeignKey,
    DecimalField,
    PositiveSmallIntegerField,
    ManyToManyField
)
from django.core.validators import (
    MinValueValidator,
    MaxValueValidator
)

from categories.models import Category
from producers.models import Producer
from users.models import User
from tags.models import Tag


class Beverage(Model):
    modified_at = DateTimeField(
        _('Modified at'),
        auto_now=True
    )
    name = CharField(
        _('Name'),
        unique=True,
        max_length=200
    )
    producer = ForeignKey(
        Producer,
        null=True,
        blank=True,
        on_delete=SET_NULL,
        related_name='beverages'
    )
    category = ForeignKey(
        Category,
        null=True,
        blank=True,
        on_delete=SET_NULL,
        related_name='beverages'
    )
    user = ForeignKey(
        User,
        null=True,
        on_delete=CASCADE,
        related_name='beverages'
    )
    classification = CharField(
        _('Classification'),
        null=True,
        blank=True,
        max_length=200
    )
    base = CharField(
        _('Base'),
        null=True,
        blank=True,
        max_length=200
    )
    year = PositiveSmallIntegerField(
        _('Year'),
        null=True,
        blank=True
    )
    degree = DecimalField(
        _('Degree (%)'),
        null=True,
        blank=True,
        max_digits=5,
        decimal_places=2
    )
    volume = PositiveSmallIntegerField(
        _('Volume (mL)'),
        null=True,
        blank=True
    )
    price = DecimalField(
        _('Price'),
        null=True,
        blank=True,
        max_digits=8,
        decimal_places=2
    )
    # tags = ManyToManyField(
    #     Tag,
    #     blank=True,
    #     related_name='beverages'
    # )

    def __str__(self):
        return self.name
