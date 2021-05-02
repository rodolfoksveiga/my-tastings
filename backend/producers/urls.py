from django.urls import path

from .views import (
    producers_view,
    producer_view,
    create_producer_view,
    update_producer_view,
    delete_producer_view
)

urlpatterns = [
    path('', producers_view, name='producers'),
    path('<int:id>/', producer_view, name='producer'),
    path('create/', create_producer_view, name='create-producer'),
    path('<int:id>/update/', update_producer_view, name='update-producer'),
    path('<int:id>/delete/', delete_producer_view, name='delete-producer'),
]
