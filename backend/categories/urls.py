from django.urls import path

from .views import (
    CategoriesList,
    CategoryDetail
)


urlpatterns = [
    path('', CategoriesList.as_view()),
    path('<int:pk>/', CategoryDetail.as_view())
]
