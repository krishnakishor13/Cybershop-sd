
from django.urls import path
from . import views

urlpatterns = [
    path('', views.CartList.as_view(), name='cart_list'),
    path('add/', views.CartAdd.as_view(), name='cart_add'),
    path('delete/<int:pk>/', views.CartDelete.as_view(), name='cart_delete'),
    path('update/<int:pk>/', views.CartUpdate.as_view(), name='cart_update'),
]