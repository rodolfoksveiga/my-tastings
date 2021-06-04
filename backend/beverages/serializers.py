from rest_framework import serializers

from .models import Beverage


class BeverageSerializer(serializers.ModelSerializer):
    producerName = serializers.CharField(
        source='producer.name', read_only=True)
    categoryName = serializers.CharField(
        source='category.name', read_only=True)

    class Meta:
        model = Beverage
        fields = [
            'id',
            'modified_at',
            'name',
            'producer',
            'producerName',
            'category',
            'categoryName',
            'user',
            'classification',
            'base',
            'year',
            'degree',
            'volume',
            'price',
            'tags'
        ]
