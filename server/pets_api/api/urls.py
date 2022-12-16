from django.urls import path
from .views import (
    CharactersAllApiView,
    CharacterDetailsApiView,
    LoginApiView
)

urlpatterns = [
    path('characters/', CharactersAllApiView.as_view()),
    path('characters/<int:character_id>', CharacterDetailsApiView.as_view()),
    path("login/", LoginApiView.as_view())
]
