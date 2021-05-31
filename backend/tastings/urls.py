from django.urls import path

from .views import (
    TastingsList,
    TastingDetails
)


urlpatterns = [
    path('', TastingsList.as_view()),
    path('<int:pk>/', TastingDetails.as_view())
]
