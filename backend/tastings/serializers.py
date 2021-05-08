from rest_framework import serializers

from .models import Tasting


class TastingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tasting
        fields = [
            'name',
            'category',
            'producer',
            'rating',
            'color',
            'appearance',
            'aroma',
            'finish',
            'price',
            'user'
        ]
