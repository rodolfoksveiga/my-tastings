from django.urls import path

from .views import (
    CategoriesList,
    CategoryDetails
)


urlpatterns = [
    path('', CategoriesList.as_view()),
    path('<int:pk>/', CategoryDetails.as_view())
]
