from django.urls import path

from .views import (
    TastingsList,
    TastingDetail
)


urlpatterns = [
    path('', TastingsList.as_view()),
    path('<int:pk>/', TastingDetail.as_view())
]
