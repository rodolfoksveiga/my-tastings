from django.urls import path

from .views import (
    BeveragesList,
    BeverageDetail
)


urlpatterns = [
    path('', BeveragesList.as_view()),
    path('<int:pk>/', BeverageDetail.as_view())
]
