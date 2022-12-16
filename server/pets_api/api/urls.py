from django.urls import path
from .views import (
    CharactersAllApiView,
    CharacterDetailsApiView,
    LoginApiView,
    LogoutApiView,
    UserApiView,
    RegisterApiView
)

urlpatterns = [
    path('characters/', CharactersAllApiView.as_view()),
    path('characters/<int:character_id>', CharacterDetailsApiView.as_view()),
    path("login/", LoginApiView.as_view()),
    path("logout/", LogoutApiView.as_view()),
    path("account/", UserApiView.as_view()),
    path("register/", RegisterApiView.as_view())
]
