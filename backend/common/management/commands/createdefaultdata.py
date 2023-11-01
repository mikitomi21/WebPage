from django.core.management.base import BaseCommand
from faker import Faker
from posts.models import Post
from authentication.models import CustomUser

NUMBER_OF_USERS = 10
NUMBER_OF_POST_PER_USER = 2

fake = Faker("pl_PL")


class Command(BaseCommand):
    help = "Create a default data for users and posts"

    @staticmethod
    def create_post(author) -> Post:
        return Post(
            author=author,
            title=fake.location_on_land()[2],
            text=fake.paragraph(nb_sentences=2),
        )

    @staticmethod
    def create_user() -> CustomUser:
        return CustomUser(
            first_name = fake.first_name(),
            last_name = fake.last_name(),
            username=fake.first_name(),
            email=fake.ascii_email(),
            avatar=None
        )

    @staticmethod
    def clear_db() -> None:
        CustomUser.objects.all().delete()
        Post.objects.all().delete()


    def handle(self, *args, **options):
        try:
            self.clear_db()
            for _ in range(NUMBER_OF_USERS):
                user = self.create_user()
                if user not in CustomUser.objects.all():
                    user.save()
                for _ in range(NUMBER_OF_POST_PER_USER):
                    post = self.create_post(user)
                    if post not in Post.objects.all():
                        post.save()

            self.stdout.write(self.style.SUCCESS("Successfully created data"))
        except Exception as e:
            self.stdout.write(self.style.SUCCESS(f"Error creating data {e}"))

