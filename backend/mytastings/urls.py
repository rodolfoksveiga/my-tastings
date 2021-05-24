from django.contrib import admin
from django.urls import (
    include,
    path
)
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView
)


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/users/', include('users.urls')),
    path('api/tastings/', include('tastings.urls')),
    path('api/categories/', include('categories.urls')),
    path('api/producers/', include('producers.urls')),
    path('api/beverages/', include('beverages.urls')),
    path('api/tags/', include('tags.urls')),
    path('api-auth/', include('rest_framework.urls')),
    path('api/token/', TokenObtainPairView.as_view()),
    path('api/token/refresh/', TokenRefreshView.as_view())
]
