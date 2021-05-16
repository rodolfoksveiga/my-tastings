from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.permissions import SAFE_METHODS, IsAuthenticated, BasePermission, DjangoModelPermissions

from .models import Tasting
from .serializers import TastingSerializer


class TastingUserWritePermission(BasePermission):
    message = 'Editing a tasting is restricted to the tasting owner only.'

    def has_object_permission(self, request, view, obj):
        if request.method in SAFE_METHODS:
            return True
        return obj.user == request.user or request.user.is_superuser


class TastingsList(ListCreateAPIView):
    queryset = Tasting.objects.all()
    serializer_class = TastingSerializer


class TastingDetail(RetrieveUpdateDestroyAPIView, TastingUserWritePermission):
    permission_classes = [IsAuthenticated, TastingUserWritePermission]
    queryset = Tasting.objects.all()
    serializer_class = TastingSerializer


'''
class TastingViewSet(viewsets.ModelViewSet, TastingUserWritePermission):
    # permission_classes = [TastingUserWritePermission]
    # permission_classes = [IsAdminUser]
    serializer_class = TastingSerializer

    def get_queryset(self):
        queryset = Tasting.objects.all()
        return queryset
'''

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
