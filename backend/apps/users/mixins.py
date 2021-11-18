from rest_framework import status
from rest_framework.response import Response
from rest_framework.renderers import JSONRenderer
import datetime
from .models import User


# Add this mixin to the login-required class.
class CustomLoginRequiredMixin():

    def dispatch(self, request, *args, **kwargs):
        if 'Authorization' not in request.headers:
            response = Response({'error': 'Please set Auth-Token.'}, status=status.HTTP_404_NOT_FOUND)
            response.accepted_renderer = JSONRenderer()
            response.accepted_media_type = "application/json"
            response.renderer_context = {}
            return response

        token = request.headers['Authorization']
        now = datetime.datetime.now()
        login_user = User.objects.filter(token=token, token_expires_at__gt=now)
        if len(login_user) == 0:
            response = Response({'error': 'The token is invalid or expired.'}, status=status.HTTP_404_NOT_FOUND)
            response.accepted_renderer = JSONRenderer()
            response.accepted_media_type = "application/json"
            response.renderer_context = {}
            return response

        request.login_user = login_user[0]
        return super().dispatch(request, *args, **kwargs)

