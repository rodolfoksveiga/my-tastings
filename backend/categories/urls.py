from django.conf.urls import (
    include,
    url
)
from rest_framework.routers import SimpleRouter

from .views import CategoryViewSet


router = SimpleRouter()
router.register('', CategoryViewSet, basename='categories')

urlpatterns = [
    url('', include(router.urls))
]
