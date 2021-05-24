from django.urls import path

from .views import (
    TagsList,
    TagDetail
)


urlpatterns = [
    path('', TagsList.as_view()),
    path('<int:pk>/', TagDetail.as_view())
]
