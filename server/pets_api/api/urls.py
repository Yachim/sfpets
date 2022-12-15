from django.urls import path
from .views import (
    CharactersAllApiView,
    CharacterDetailsApiView
)

urlpatterns = [
    path('characters/', CharactersAllApiView.as_view()),
    path('characters/<int:character_id>', CharacterDetailsApiView.as_view()),
]
