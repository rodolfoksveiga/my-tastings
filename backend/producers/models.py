from django.db import models


class Producer(models.Model):
    added = models.DateTimeField(auto_now_add=True)
    name = models.CharField(
        'Producer Name',
        max_length=100
    )

    def __str__(self):
        return self.name
