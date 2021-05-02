from django.urls import path

from .views import (
    tastings_view,
    tasting_view,
    create_tasting_view,
    update_tasting_view,
    delete_tasting_view
)

urlpatterns = [
    path('', tastings_view, name='tastings'),
    path('<int:id>/', tasting_view, name='tasting'),
    path('create/', create_tasting_view, name='create-tasting'),
    path('<int:id>/update/', update_tasting_view, name='update-tasting'),
    path('<int:id>/delete/', delete_tasting_view, name='delete-tasting'),
]
