from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.contrib.postgres.fields import ArrayField


# https://www.fomfus.com/articles/how-to-use-email-as-username-for-django-authentication-removing-the-username/
class UserManager(BaseUserManager):
    """Define a model manager for User model with no username field."""

    use_in_migrations = True

    def _create_user(self, email, password, **extra_fields):
        """Create and save a User with the given email and password."""
        if not email:
            raise ValueError('The given email must be set')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_user(self, email, password=None, **extra_fields):
        """Create and save a regular User with the given email and password."""
        extra_fields.setdefault('is_staff', False)
        extra_fields.setdefault('is_superuser', False)
        return self._create_user(email, password, **extra_fields)

    def create_superuser(self, email, password, **extra_fields):
        """Create and save a SuperUser with the given email and password."""
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        return self._create_user(email, password, **extra_fields)


# Create your models here.
class User(AbstractUser):
    username = None
    email = models.EmailField(('email address'), unique=True)
    dark_theme = models.BooleanField(default=True)
    lang = models.CharField(max_length=2, default="en")

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    objects = UserManager()


class Character(models.Model):
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="character_user")
    name = models.CharField(max_length=50)
    world = models.CharField(max_length=8)

    shadow_found = ArrayField(models.IntegerField(), blank=True, default=list)
    light_found = ArrayField(models.IntegerField(), blank=True, default=list)
    earth_found = ArrayField(models.IntegerField(), blank=True, default=list)
    fire_found = ArrayField(models.IntegerField(), blank=True, default=list)
    water_found = ArrayField(models.IntegerField(), blank=True, default=list)
