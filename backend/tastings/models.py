from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator
from django.contrib.auth.models import User

from categories.models import Category
from producers.models import Producer


class Tasting(models.Model):
    added = models.DateTimeField(auto_now_add=True)
    name = models.CharField(
        'Wine Name',
        max_length=100
    )
    category = models.ForeignKey(
        Category,
        null=True,
        on_delete=models.PROTECT
    )
    producer = models.ForeignKey(
        Producer,
        null=True,
        on_delete=models.PROTECT
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
    rating = models.IntegerField(
        'Wine Rating',
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
    color = models.CharField(
        'Wine Color',
        max_length=100,
        choices=color_choices
    )
    appearance = models.CharField(
        'Wine Appearance',
        max_length=100
    )
    aroma = models.CharField(
        'Wine Aroma',
        max_length=100
    )
    finish = models.CharField(
        'Wine Finish',
        max_length=100
    )
    price = models.DecimalField(
        max_digits=6,
        decimal_places=2
    )
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='tastings'
    )

    def __str__(self):
        return self.name
