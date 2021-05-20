from django.utils.translation import gettext_lazy as _
from django.db.models import (
    PROTECT,
    CASCADE,
    Model,
    DateTimeField,
    CharField,
    IntegerField,
    DecimalField,
    ForeignKey
)

from users.models import User
from categories.models import Category
from producers.models import Producer


class Tasting(Model):
    created_at = DateTimeField(
        _('Created at'),
        auto_now_add=True
    )
    name = CharField(
        _('Name'),
        max_length=100
    )
    category = ForeignKey(
        Category,
        null=True,
        on_delete=PROTECT
    )
    producer = ForeignKey(
        Producer,
        null=True,
        on_delete=PROTECT
    )
    rating_choices = (
        (1, 1),
        (2, 2),
        (3, 3),
        (4, 4),
        (5, 5),
        (6, 6),
        (7, 7),
        (8, 8),
        (9, 9),
        (10, 10)
    )
    rating = IntegerField(
        _('Rating'),
        choices=rating_choices
    )
    color_choices = (
        ('ruby', 'Pinot Noir - Ruby'),
        ('garnet', 'Tempranillo - Garnet'),
        ('violet', 'Shiraz - Violet/Deep Purple'),
        ('deep_ruby', 'Cabernet Sauvignon - Deep Ruby'),
        ('pale_yellow', 'Pinot Grigio - Pale Yellow'),
        ('pale_gold', 'Sauvignon Blanc - Pale Gold/Light Yellow'),
        ('gold', 'Chardonnay - Gold'),
        ('deep_gold', 'Semillon - Deep Gold'),
        ('pale_blush', 'Merlot - Pale Blush'),
        ('blush', 'Shiraz - Blush'),
        ('salmon', 'Tempranillo - Salmon'),
        ('deep_salmon', 'Petite Verdot - Deep Salmon')
    )
    color = CharField(
        _('Color'),
        max_length=100,
        choices=color_choices
    )
    appearance = CharField(
        _('Appearance'),
        max_length=100
    )
    aroma = CharField(
        _('Aroma'),
        max_length=100
    )
    finish = CharField(
        _('Finish'),
        max_length=100
    )
    price = DecimalField(
        _('Price'),
        max_digits=7,
        decimal_places=2
    )
    user = ForeignKey(
        User,
        on_delete=CASCADE,
        related_name='tastings'
    )

    def __str__(self):
        return self.name
