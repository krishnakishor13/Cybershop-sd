from .models import Item
from rest_framework import serializers


class ItemSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(allow_null=True)

    class Meta:
        model = Item
        fields = '__all__'