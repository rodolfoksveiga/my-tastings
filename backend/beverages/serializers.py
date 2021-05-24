from rest_framework import serializers

from .models import Beverage


class BeverageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Beverage
        fields = [
            'id',
            'modified_at',
            'name',
            'category',
            'producer',
            'user',
            'classification',
            'base',
            'year',
            'degree',
            'volume',
            'price',
            'tags'
        ]
