from django.urls import path

from .views import (
    TagsList,
    TagDetails
)


urlpatterns = [
    path('', TagsList.as_view()),
    path('<int:pk>/', TagDetails.as_view())
]
