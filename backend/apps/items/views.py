from rest_framework import generics
from .serializers import ItemSerializer
from django.http import JsonResponse
from .models import Item


class ItemList(generics.ListAPIView):
    # Get all posts, limit = 20
    queryset = Item.objects.order_by('created_at').reverse().filter(status='active')
    serializer_class = ItemSerializer

# Create your views here.
