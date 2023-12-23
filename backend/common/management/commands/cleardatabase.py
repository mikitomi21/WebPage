from django.core.management import call_command
from django.core.management.base import BaseCommand
from authentication.models import CustomUser
from posts.models import Post, Comment


class Command(BaseCommand):
    help = "Delete of data from database"

    def handle(self, *args, **options):
        self.stdout.write("Deleting data from database...")
        call_command('clear_media_files')
        CustomUser.objects.all().delete()
        Post.objects.all().delete()
        Comment.objects.all().delete()
        self.stdout.write("Deleted all data from database.")
