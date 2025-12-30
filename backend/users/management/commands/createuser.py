from getpass import getpass

from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model


class Command(BaseCommand):
    help = 'Create a new user'

    def handle(self, *args, **kwargs):
        self.stdout.write("Creating user:")
        print("Creating user...")
        login = input("Login: ")
        password = getpass("Password: ")

        User = get_user_model()
        if User.objects.filter(login=login).exists():
            self.stdout.write(self.style.ERROR(
                f'User with login "{login}" already exists.'))
            return

        User.objects.create_user(login=login, password=password)
        self.stdout.write(self.style.SUCCESS(
            f'User "{login}" created successfully.'))
