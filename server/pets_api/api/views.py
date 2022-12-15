from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import permissions
from .models import Character
from .serializers import CharacterSerializer

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
