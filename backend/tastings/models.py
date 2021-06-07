from django.utils.translation import gettext_lazy as _
from django.db.models import (
    SET_NULL,
    CASCADE,
    Model,
    DateTimeField,
    CharField,
    PositiveSmallIntegerField,
    DecimalField,
    ForeignKey
)
from django.core.validators import (
    MinValueValidator,
    MaxValueValidator
)

from beverages.models import Beverage
from users.models import User


class Tasting(Model):
    modified_at = DateTimeField(
        _('Modified at'),
        auto_now=True
    )
    name = CharField(
        _('Name'),
        max_length=200
    )
    beverage = ForeignKey(
        Beverage,
        null=True,
        blank=True,
        on_delete=SET_NULL,
        related_name='tastings'
    )
    user = ForeignKey(
        User,
        null=True,
        on_delete=CASCADE,
        related_name='tastings'
    )
    color = CharField(
        _('Color'),
        null=True,
        blank=True,
        max_length=200
    )
    appearance = CharField(
        _('Appearance'),
        null=True,
        blank=True,
        max_length=200
    )
    aroma = CharField(
        _('Aroma'),
        null=True,
        blank=True,
        max_length=200
    )
    finish = CharField(
        _('Finish'),
        null=True,
        blank=True,
        max_length=200
    )
    rating = PositiveSmallIntegerField(
        _('Rating'),
        validators=[MinValueValidator(1), MaxValueValidator(10)]
    )

    def __str__(self):
        return self.name


'''
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
'''
