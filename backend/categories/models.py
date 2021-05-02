from django.db import models


class Category(models.Model):
    added = models.DateTimeField(auto_now_add=True)
    name = models.CharField(
        'Category Name',
        max_length=100
    )
