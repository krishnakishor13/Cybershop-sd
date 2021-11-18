from django.db.models.query import QuerySet
from django.shortcuts import render
from rest_framework import generics
from rest_framework import status
from rest_framework.response import Response
from rest_framework.renderers import JSONRenderer
from .serializers import CartSerializer, CartAddSerializer
from ..users.mixins import CustomLoginRequiredMixin
from django_filters.rest_framework import DjangoFilterBackend
from .models import Cart
from .forms import CartForm

class CartList(CustomLoginRequiredMixin, generics.ListAPIView):
    queryset = Cart.objects.all()
    serializer_class = CartSerializer
    # filter_backends = [DjangoFilterBackend]
    # filterset_fields = ['user_id']

    def get(self, request, *args, **kwargs):
        self.queryset = Cart.objects.order_by('-created_at').filter(user=request.login_user)
        return self.list(request, *args, **kwargs)

class CartAdd(CustomLoginRequiredMixin, generics.CreateAPIView):
    queryset = Cart.objects.all()
    serializer_class = CartAddSerializer

    def post(self, request, *args, **kwargs):
        # Set the user who login
        request.data['user'] = request.login_user.id
        return self.create(request, *args, **kwargs)

class CartDelete(CustomLoginRequiredMixin, generics.DestroyAPIView):
    queryset = Cart.objects.all()
    serializer_class = CartSerializer

    def delete(self, request, *args, **kwargs):
        cart = Cart.objects.get(pk=self.kwargs['pk'])
        if cart.user.id != request.login_user.id:
            response = Response({'error': 'You can not delete the cartlist not owned by you.'}, status=status.HTTP_404_NOT_FOUND)
            response.accepted_renderer = JSONRenderer()
            response.accepted_media_type = "application/json"
            response.renderer_context = {}
            return response
        return self.destroy(request, *args, **kwargs)

class CartUpdate(CustomLoginRequiredMixin, generics.UpdateAPIView):
    queryset = Cart.objects.all()
    serializer_class = CartSerializer
    
    def update(self, request, *args, **kwargs):
        cart = Cart.objects.get(pk=self.kwargs['pk'])
        if cart.user.id != request.login_user.id:
            response = Response({'error': 'You can not update the cartlist not owned by you.'}, status=status.HTTP_404_NOT_FOUND)
            response.accepted_renderer = JSONRenderer()
            response.accepted_media_type = "application/json"
            response.renderer_context = {}
            return response

        cart.quantity = request.data['quantity']
        cart.save()
        serializer = CartSerializer([cart], many=True)
        return Response(serializer.data[0])