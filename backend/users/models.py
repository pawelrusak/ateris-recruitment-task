from django.db import models
from django.contrib.auth.models import (
    AbstractBaseUser,
    PermissionsMixin
)

from .managers import UserManager


class User(AbstractBaseUser, PermissionsMixin):
    login = models.CharField(max_length=255, unique=True)  # type: ignore
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)  # type: ignore

    objects = UserManager()

    USERNAME_FIELD = 'login'

    def __str__(self):
        return self.login
