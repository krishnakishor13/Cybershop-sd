from django.shortcuts import render
from rest_framework import generics
from rest_framework import status
from rest_framework.response import Response
from rest_framework.renderers import JSONRenderer
from ..users.mixins import CustomLoginRequiredMixin
from .models import OrderItem, Order
from apps.carts.models import Cart
from .serializers import OrderSerializer
from django.core import serializers
from .forms import OrderForm, OrderItemForm
import json

# Create your views here.
class OrderAdd(CustomLoginRequiredMixin, generics.CreateAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer

    def get(self, request, *args, **kwargs):
        self.queryset = Cart.objects.order_by('-created_at').filter(user=request.login_user)
        return self.list(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        # Save to order
        request.data["user"] = request.login_user.id
        order_form = OrderForm(request.data)
        if not order_form.is_valid():
            response = Response({"error": "Request data is not correct."}, status=status.HTTP_404_NOT_FOUND)
            response.accepted_renderer = JSONRenderer()
            response.accepted_media_type = "application/json"
            response.renderer_context = {}
            return response

        order = order_form.save()

        # Get cart items of login user
        carts = Cart.objects.filter(user=request.login_user)

        # Save to order items
        for cart in carts:
            order_item_form = OrderItemForm({"order": order.id, "item":cart.item.id, "quantity":cart.quantity})
            order_item_form.save()
        
        # Delete cart items
        carts.delete()
            
        serializer = OrderSerializer([order], many=True)
        return Response(serializer.data[0])