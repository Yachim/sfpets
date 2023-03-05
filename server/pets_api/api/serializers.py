from rest_framework import serializers
from django.contrib.auth import authenticate
from .models import User, Character


class CharacterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Character
        fields = [
            "id",
            "user",
            "name",
            "world",
            "shadow_found",
            "light_found",
            "earth_found",
            "fire_found",
            "water_found"
        ]
        read_only_fields = ["id"]


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "email", "password", "dark_theme", "lang"]
        read_only_fields = ["id"]
        extra_kwargs = {
            "password": {"write_only": True}
        }

    def create(self, validated_data):
        user = User.objects.create_user(
            email=validated_data["email"],
            password=validated_data["password"]
        )

        return user


# https://www.guguweb.com/2022/01/23/django-rest-framework-authentication-the-easy-way/
class LoginSerializer(serializers.Serializer):
    """
    This serializer defines two fields for authentication:
      * email
      * password.
    It will try to authenticate the user with when validated.
    """
    email = serializers.CharField(
        label="Email",
        write_only=True
    )
    password = serializers.CharField(
        label="Password",
        # This will be used when the DRF browsable API is enabled
        style={'input_type': 'password'},
        trim_whitespace=False,
        write_only=True
    )

    def validate(self, attrs):
        # Take username and password from request
        email = attrs.get('email')
        password = attrs.get('password')

        if email and password:
            # Try to authenticate the user using Django auth framework.
            user = authenticate(request=self.context.get('request'),
                                email=email, password=password)
            if not user:
                # If we don't have a regular user, raise a ValidationError
                msg = 'Access denied: wrong username or password.'
                raise serializers.ValidationError(msg, code='authorization')
        else:
            msg = 'Both "email" and "password" are required.'
            raise serializers.ValidationError(msg, code='authorization')
        # We have a valid user, put it in the serializer's validated_data.
        # It will be used in the view.
        attrs['user'] = user
        return attrs
