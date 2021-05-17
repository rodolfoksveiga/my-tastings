from django.contrib import admin
from django.urls import (
    include,
    path
)


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/tastings/', include('tastings.urls')),
    path('api/categories/', include('categories.urls')),
    path('api/producers/', include('producers.urls')),
    path('api-auth/', include('rest_framework.urls'))
]
