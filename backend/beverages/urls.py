from django.urls import path

from .views import (
    BeveragesList,
    BeverageDetails
)


urlpatterns = [
    path('', BeveragesList.as_view()),
    path('<int:pk>/', BeverageDetails.as_view())
]
