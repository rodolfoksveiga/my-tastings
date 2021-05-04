from django.conf.urls import include, url
from rest_framework.routers import SimpleRouter

from .views import TastingViewSet

router = SimpleRouter()
router.register('', TastingViewSet, basename='tastings')

urlpatterns = [
    url('', include(router.urls))
]
