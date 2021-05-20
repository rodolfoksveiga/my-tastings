from rest_framework import serializers

from .models import Tasting


class TastingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tasting
        fields = [
            'created_at',
            'id',
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
