import requests
from django.contrib.auth.models import AbstractUser
from django.core.files.base import ContentFile
from django.db import models

from authentication.utils import get_random_gravatar


class CustomUser(AbstractUser):
    email = models.EmailField(unique=True)
    avatar = models.ImageField(upload_to='avatars', null=True, blank=True)
    friends = models.ManyToManyField("self", related_name="user_friends")

    def add_friend(self, user) -> None:
        self.friends.add(user)

    def __str__(self):
        return self.username

    def save(self, *args, **kwargs):
        if not self.avatar:
            self.avatar.save(
                f'{self.username}_avatar.jpg', ContentFile(requests.get(get_random_gravatar()).content), save=False
            )
        super().save(*args, **kwargs)
