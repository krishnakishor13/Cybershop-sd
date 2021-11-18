from rest_framework.generics import ListCreateAPIView
from .models import Order, OrderItem
from rest_framework import serializers

class OrderSerializer(serializers.ModelSerializer):

    class Meta:
        model = Order
        fields = '__all__'