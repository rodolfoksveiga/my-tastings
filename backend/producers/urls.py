from django.conf.urls import include, url
from rest_framework.routers import SimpleRouter

from .views import ProducerViewSet

router = SimpleRouter()
router.register('', ProducerViewSet, basename='producers')

urlpatterns = [
    url('', include(router.urls))
]
