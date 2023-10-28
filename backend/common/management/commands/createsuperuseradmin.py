from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from django.conf import settings

User = get_user_model()


class Command(BaseCommand):
    help = 'Create a superuser with custom credentials'

    def handle(self, *args, **options):
        superuser_username = settings.SUPERUSER_USERNAME
        superuser_email = settings.SUPERUSER_EMAIL
        superuser_password = settings.SUPERUSER_PASSWORD

        try:
            user = User.objects.create_superuser(
                username=superuser_username,
                email=superuser_email,
                password=superuser_password
            )

            self.stdout.write(self.style.SUCCESS(f'Successfully created superuser: {user.username}'))
        except Exception as e:
            self.stderr.write(self.style.ERROR(f'Error creating superuser: {e}'))
