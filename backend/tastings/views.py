from rest_framework import viewsets

from .models import Tasting
from .serializers import TastingSerializer


class TastingViewSet(viewsets.ModelViewSet):
    serializer_class = TastingSerializer

    def get_queryset(self):
        queryset = Tasting.objects.all()
        return queryset
