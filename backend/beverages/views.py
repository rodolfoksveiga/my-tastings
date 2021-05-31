from django.db.models import Q
from rest_framework.generics import (
    ListCreateAPIView,
    RetrieveUpdateDestroyAPIView
)
from rest_framework.permissions import (
    SAFE_METHODS,
    IsAuthenticated,
    BasePermission,
    DjangoModelPermissions
)

from .models import Beverage
from .serializers import BeverageSerializer


class BeverageUserWritePermission(BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in SAFE_METHODS:
            return True
        return obj.user == request.user or request.user.is_superuser


class BeveragesList(ListCreateAPIView):
    serializer_class = BeverageSerializer

    def get_queryset(self):
        user = self.request.user
        if user.is_staff:
            return Beverage.objects.all().order_by('modified_at').reverse()
        return Beverage.objects.filter(Q(user=user) | Q(user=1)).order_by('modified_at').reverse()


class BeverageDetails(RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAuthenticated, BeverageUserWritePermission]
    serializer_class = BeverageSerializer
    queryset = Beverage.objects.all()


''' Concrete View Classes
    # CreateAPIView
        Used for create-only endpoints.
    # ListAPIView
        Used for read-only endpoints to represent a collection of model instances.
    # RetrieveAPIView
        Used for read-only endpoints to represent a single model instance.
    # DestroyAPIView
        Used for delete-only endpoints for a single model instance.
    # UpdateAPIView
        Used for update-only endpoints for a single model instance.
    # ListCreateAPIView
        Used for read-write endpoints to represent a collection of model instances.
    # RetrieveUpdateAPIView
        Used for read or update endpoints to represent a single model instance.
    # RetrieveDestroyAPIView
        Used for read or delete endpoints to represent a single model instance.
    # RetrieveUpdateDestroyAPIView
        Used for read-write-delete endpoints to represent a single model instance.
'''
