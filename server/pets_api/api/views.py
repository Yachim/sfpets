from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import permissions
from .models import Character
from .serializers import (
    CharacterSerializer,
    LoginSerializer
)
from django.contrib.auth import login


class CharactersAllApiView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    # get all characters
    def get(self, request, *args, **kwargs):
        pass

    # create a new character
    def post(self, request, *args, **kwargs):
        pass


class CharacterDetailsApiView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    # get character details (found pets, ...)
    def get(self, request, character_id, *args, **kwargs):
        pass

    # edit character
    def put(self, request, character_id, *args, **kwargs):
        pass

    # delete a character
    def delete(self, request, character_id, *args, **kwargs):
        pass


# https://www.guguweb.com/2022/01/23/django-rest-framework-authentication-the-easy-way/
class LoginApiView(APIView):
    # This view should be accessible also for unauthenticated users.
    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        serializer = LoginSerializer(
            data=self.request.data,
            context={'request': self.request}
        )
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        login(request, user)
        return Response(None, status=status.HTTP_202_ACCEPTED)
