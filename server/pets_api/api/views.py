from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from rest_framework.generics import CreateAPIView
from .models import Character, User
from .serializers import (
    CharacterSerializer,
    LoginSerializer,
    UserSerializer
)
from rest_framework.authtoken.models import Token


# https://blog.logrocket.com/django-rest-framework-create-api/
class CharactersAllApiView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    # get all characters' details
    def get(self, request, *args, **kwargs):
        characters = Character.objects.filter(user=request.user.id)
        serializer = CharacterSerializer(characters, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    # create a new character
    def post(self, request, *args, **kwargs):
        print(request.user.id)
        data = {
            "world": request.data.get("world"),
            "name": request.data.get("name"),
            "user": request.user.id
        }

        serializer = CharacterSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CharacterDetailsApiView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get_character(self, user_id, character_id):
        try:
            return Character.objects.get(user=user_id, id=character_id)
        except Character.DoesNotExist:
            return None

    # get character's details (found pets, ...)
    def get(self, request, character_id, *args, **kwargs):
        character = self.get_character(request.user.id, character_id)
        if not character:
            return Response(
                {"res": "Character object with that id does not exists"},
                status=status.HTTP_400_BAD_REQUEST
            )

        serializer = CharacterSerializer(character)
        return Response(serializer.data, status=status.HTTP_200_OK)

    # edit character
    def patch(self, request, character_id, *args, **kwargs):
        character = self.get_character(request.user.id, character_id)
        if not character:
            return Response(
                {"res": "Character object with that id does not exists"},
                status=status.HTTP_400_BAD_REQUEST
            )

        if "user" in request.data:
            request.data.pop("user")
        serializer = CharacterSerializer(
            character, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_200_OK)

    # delete a character
    def delete(self, request, character_id, *args, **kwargs):
        character = self.get_character(request.user.id, character_id)
        if not character:
            return Response(
                {"res": "Character object with that id does not exists"},
                status=status.HTTP_400_BAD_REQUEST
            )

        character.delete()
        return Response(
            {"res": "Character deleted!"},
            status=status.HTTP_200_OK
        )


class UserApiView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        user = User.objects.get(id=request.user.id)
        serializer = UserSerializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def patch(self, request):
        user = User.objects.get(id=request.user.id)
        if "password" in request.data:
            user.set_password(request.data["password"])
            request.data.pop("password")

        serializer = UserSerializer(user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_200_OK)

    def delete(self, request):
        User.objects.get(id=request.user.id).delete()
        return Response(
            {"res": "Account deleted!"},
            status=status.HTTP_200_OK
        )


class RegisterApiView(CreateAPIView):
    permission_classes = [permissions.AllowAny]
    model = User
    serializer_class = UserSerializer


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

        # https://medium.com/quick-code/token-based-authentication-for-django-rest-framework-44586a9a56fb
        token, _ = Token.objects.get_or_create(user=user)
        return Response({"token": token.key}, status=status.HTTP_202_ACCEPTED)


class LogoutApiView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        request.user.auth_token.delete()
        return Response(None, status=status.HTTP_200_OK)
