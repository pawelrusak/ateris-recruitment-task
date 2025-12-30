from django.contrib.auth.models import BaseUserManager


class UserManager(BaseUserManager):

    def normalize_login(self, login):
        return login.lower().strip()

    def create_user(self, login, password=None, **extra_fields):
        if not login:
            raise ValueError('User must have a login.')

        if not password:
            raise ValueError('User must have a password.')

        user = self.model(login=self.normalize_login(login), **extra_fields)
        user.set_password(password)
        user.save(using=self._db)

        return user

    def create_superuser(self, login, password,  **extra_fields):
        user = self.create_user(login, password, **extra_fields)
        user.is_staff = True
        user.is_superuser = True
        user.is_active = True
        user.is_admin = True
        user.save(using=self._db)

        return user
