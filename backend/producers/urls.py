from django.urls import path

from .views import (
    ProducersList,
    ProducerDetails
)


urlpatterns = [
    path('', ProducersList.as_view()),
    path('<int:pk>/', ProducerDetails.as_view())
]
