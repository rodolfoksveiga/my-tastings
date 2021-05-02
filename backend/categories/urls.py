from django.urls import path

from .views import (
    categories_view,
    category_view,
    create_category_view,
    update_category_view,
    delete_category_view
)

urlpatterns = [
    path('', categories_view, name='categories'),
    path('<int:id>/', category_view, name='category'),
    path('create/', create_category_view, name='create-category'),
    path('<int:id>/update/', update_category_view, name='update-category'),
    path('<int:id>/delete/', delete_category_view, name='delete-category'),
]
