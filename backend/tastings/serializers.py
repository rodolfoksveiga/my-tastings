from rest_framework import serializers

from .models import Tasting


class TastingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tasting
        fields = [
            'id',
            'created_at',
            'beverage',
            'user',
            'color',
            'appearance',
            'aroma',
            'finish',
            'rating'
        ]
