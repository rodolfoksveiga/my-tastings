from django.utils.translation import gettext_lazy as _
from django.db.models import (
    PROTECT,
    CASCADE,
    Model,
    DateTimeField,
    CharField,
    ForeignKey,
    DateField,
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
        max_length=100
    )
    producer = ForeignKey(
        Producer,
        null=True,
        on_delete=PROTECT,
        related_name='beverages'
    )
    category = ForeignKey(
        Category,
        null=True,
        on_delete=PROTECT,
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
        max_length=100
    )
    base = CharField(
        _('Base'),
        null=True,
        max_length=100
    )
    year = DateField(
        _('Year'),
        null=True,
    )
    degree = DecimalField(
        _('Degree (%)'),
        null=True,
        max_digits=5,
        decimal_places=2,
        validators=[MinValueValidator(0), MaxValueValidator(100)]
    )
    volume = PositiveSmallIntegerField(
        _('Volume (mL)'),
        null=True,
        validators=[MinValueValidator(100), MaxValueValidator(10000)]
    )
    price = DecimalField(
        _('Price'),
        max_digits=8,
        decimal_places=2,
        validators=[MinValueValidator(0), MaxValueValidator(100000)]
    )
    # tags = ManyToManyField(
    #     Tag,
    #     blank=True,
    #     related_name='beverages'
    # )

    def __str__(self):
        return self.name
