from rest_framework import serializers

from .models import Producer


class ProducerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Producer
        fields = [
            'id',
            'modified_at',
            'name',
            'user',
            'country',
            'region',
            'tags'
        ]
