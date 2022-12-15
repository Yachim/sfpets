from rest_framework import serializers
from .models import User, Character


class CharacterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Character
        fields = [
            "world",
            "shadow_found",
            "light_found",
            "earth_found",
            "fire_found",
            "water_found"
        ]


class UserSerializer(serializers.ModelSerializer):
    user_character = CharacterSerializer(many=True)

    class Meta:
        model = User
        fields = ["email", "user_character"]
