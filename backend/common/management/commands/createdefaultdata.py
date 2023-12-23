from django.core.management import call_command
from django.core.management.base import BaseCommand
from faker import Faker
from posts.models import Post, Comment
from users.models import CustomUser
import random

NUMBER_OF_USERS = 20
MIN_NUMBER_OF_FRIENDS = 2
MAX_NUMBER_OF_FRIENDS = 5
NUMBER_OF_POST_PER_USER = 2
NUMBER_OF_COMMENTS_PER_USER = 2
MIN_NUMBER_OF_LIKES = 0
MAX_NUMBER_OF_LIKES = 10

fake = Faker("pl_PL")


class Command(BaseCommand):
    help = "Create a default data for users and posts"

    def handle(self, *args, **options):
        self.stdout.write("Waiting for creating new data...")
        try:
            call_command("cleardatabase")

            for _ in range(NUMBER_OF_USERS):
                user = self.create_user()
                if user not in CustomUser.objects.all():
                    user.save()
                for _ in range(NUMBER_OF_POST_PER_USER):
                    post = self.create_post(user)
                    if post not in Post.objects.all():
                        post.save()

            self.add_friends_to_users()
            self.add_comments_for_posts()
            self.add_likes_for_posts_and_comments()

            self.stdout.write(self.style.SUCCESS("Successfully created data"))
        except Exception as e:
            self.stdout.write(self.style.SUCCESS(f"Error creating data {e}"))

    @staticmethod
    def create_post(author: CustomUser) -> Post:
        return Post(
            author=author,
            title=fake.location_on_land()[2],
            text=fake.paragraph(nb_sentences=2),
        )

    @staticmethod
    def create_user() -> CustomUser:
        first_name = fake.first_name()
        last_name = fake.last_name()
        username = first_name + last_name
        posts = ["gmail.com", "wp.pl", "o2.pl"]
        email = f"{first_name}.{last_name}@{random.choice(posts)}"

        user = CustomUser(
            first_name=first_name,
            last_name=last_name,
            username=username,
            email=email,
            avatar=None
        )
        user.set_password(email)

        return user

    @staticmethod
    def create_comment(author: CustomUser, post: Post) -> Comment:
        return Comment(
            author=author,
            post=post,
            text=fake.paragraph(nb_sentences=1)
        )

    @staticmethod
    def add_friends_to_users() -> None:
        list_of_users = list(CustomUser.objects.all())
        for user in CustomUser.objects.all():
            numer_of_friends = random.randint(MIN_NUMBER_OF_FRIENDS, MAX_NUMBER_OF_FRIENDS)
            while user.friends.count() < numer_of_friends:
                friend = random.choice(list_of_users)
                if not user.friends.filter(id=friend.id).exists() and user != friend:
                    user.friends.add(friend)

    def add_comments_for_posts(self) -> None:
        list_of_users = list(CustomUser.objects.all())
        for post in Post.objects.all():
            comment = self.create_comment(random.choice(list_of_users), post)
            comment.save()

    @staticmethod
    def add_likes(obj):
        list_of_users = list(CustomUser.objects.all())
        numer_of_likes = random.randint(MIN_NUMBER_OF_LIKES, MAX_NUMBER_OF_LIKES)
        while numer_of_likes > obj.likes.count():
            user = random.choice(list_of_users)
            if not obj.likes.filter(id=user.id).exists():
                obj.likes.add(user)

    def add_likes_for_posts_and_comments(self) -> None:
        for post in Post.objects.all():
            self.add_likes(post)
            for comment in Comment.objects.filter(post=post.id):
                self.add_likes(comment)
