from django.urls import path
from . import views

urlpatterns = [
    path('', views.ItemList.as_view(), name='item_list'),
]