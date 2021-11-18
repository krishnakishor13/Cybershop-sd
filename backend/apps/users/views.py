import re
from typing import Generic
from rest_framework import generics
from rest_framework.response import Response
from .serializers import UserSerializer, UserSignUpSerializer, UserSignInSerializer
from .models import User
from .mixins import CustomLoginRequiredMixin


class UserSignUp(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSignUpSerializer


class UserSignIn(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSignInSerializer


# If the class requires the login status, call CustomLoginRequiredMixin
class UserCheckLogin(CustomLoginRequiredMixin, generics.RetrieveAPIView):

    def get(self, request, *args, **kwargs):
        # We can get login_user information when we use CustomLoginRequiredMixin.
        # - request.login_user
        serializer = UserSerializer([request.login_user], many=True)
        return Response(serializer.data[0])


# Sample: Add this 'CustomLoginRequiredMixin' to the login-required class.
class UserList(CustomLoginRequiredMixin, generics.ListAPIView):
    # Get all users, limit = 20
    queryset = User.objects.all()[:20]
    serializer_class = UserSerializer
