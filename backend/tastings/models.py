from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator
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
        on_delete=models.SET_NULL
    )
    producer = models.ForeignKey(
        Producer,
        null=True,
        on_delete=models.SET_NULL
    )
    rating = models.IntegerField(
        'Wine Rating',
        default=1,
        validators=[MinValueValidator(1), MaxValueValidator(5)]
    )
    # Colors of red wine
    # Pinot Noir - Ruby, Tempranillo - Garnet, Shiraz - Violet/Deep Purple, Cabernet Sauvignon - Deep Ruby
    # Shades of white wine
    # Pinot Grigio - Pale Yellow, Sauvignon Blanc - Pale Gold/Light Yellow, Chardonnay - Gold, Semillon - Deep Gold
    # Shades of rose wine
    # Merlot - Pale Blush, Shiraz - Blush, Tempranillo - Salmon, Petite Verdot - Deep Salmon
    color = models.CharField(
        'Wine Color',
        max_length=100
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
    price = models.DecimalField(max_digits=6, decimal_places=2)

    def __str__(self):
        return self.name
