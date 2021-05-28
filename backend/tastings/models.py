from django.utils.translation import gettext_lazy as _
from django.db.models import (
    PROTECT,
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
        max_length=100
    )
    beverage = ForeignKey(
        Beverage,
        on_delete=PROTECT
    )
    user = ForeignKey(
        User,
        on_delete=CASCADE,
        related_name='tastings'
    )
    color = CharField(
        _('Color'),
        max_length=100
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
