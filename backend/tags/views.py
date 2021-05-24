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

from .models import Tag
from .serializers import TagSerializer


'''
class TagUserWritePermission(BasePermission): # Mudei aqui (TagSerializer)
    message = 'Tags access permission is restricted to the tag owner only.'

    def has_object_permission(self, request, view, obj):
        return obj.user == request.user or request.user.is_superuser
'''


class TagsList(ListCreateAPIView):
    serializer_class = TagSerializer
    queryset = Tag.objects.all()

    '''
    def get_queryset(self):
        user = self.request.user
        if user.is_superuser:
            return Tag.objects.all()
        return Tag.objects.filter(user=user)
    '''


class TagDetail(RetrieveUpdateDestroyAPIView):
    # permission_classes = [IsAuthenticated, TagUserWritePermission]
    serializer_class = TagSerializer
    queryset = Tag.objects.all()


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
