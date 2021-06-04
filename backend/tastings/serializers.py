from rest_framework import serializers

from .models import Tasting


class TastingSerializer(serializers.ModelSerializer):
    beverageName = serializers.CharField(
        source='beverage.name', read_only=True)

    class Meta:
        model = Tasting
        fields = [
            'id',
            'modified_at',
            'name',
            'beverage',
            'beverageName',
            'user',
            'color',
            'appearance',
            'aroma',
            'finish',
            'rating'
        ]
