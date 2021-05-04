from rest_framework import viewsets

from .models import Producer
from .serializers import ProducerSerializer


class ProducerViewSet(viewsets.ModelViewSet):
    serializer_class = ProducerSerializer

    def get_queryset(self):
        queryset = Producer.objects.all()
        return queryset
