import os
import shutil
from django.core.management.base import BaseCommand
from django.conf import settings


class Command(BaseCommand):
    help = "Delete of data from the database"

    def handle(self, *args, **options):
        media_root = settings.MEDIA_ROOT

        if not os.path.exists(media_root):
            self.stdout.write("Media directory does not exist.")
            return

        self.stdout.write(f"Deleting all directories inside {media_root}...")

        try:
            for root, dirs, files in os.walk(media_root, topdown=False):
                for directory in dirs:
                    directory_path = os.path.join(root, directory)
                    shutil.rmtree(directory_path)

            self.stdout.write("All directories inside media directory deleted.")
        except Exception as e:
            self.stderr.write(f"Error: {e}")
