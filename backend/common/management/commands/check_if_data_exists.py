from django.core.management import call_command
from django.core.management.base import BaseCommand
from authentication.models import CustomUser


class Command(BaseCommand):
    help = "Check if data exists. If local database is empty create default data"

    def handle(self, *args, **options):
        self.stdout.write("Checking if the database has data...")
        if not CustomUser.objects.all().count():
            self.stdout.write("There is no data in database.")
            call_command("createdefaultdata")
            call_command("createsuperuseradmin")
        else:
            self.stdout.write("The database has data.")
