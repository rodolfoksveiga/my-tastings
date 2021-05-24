from django.urls import path

from .views import (
    ProducersList,
    ProducerDetail
)


urlpatterns = [
    path('', ProducersList.as_view()),
    path('<int:pk>/', ProducerDetail.as_view())
]
