from django.db import models
from authentication.models import CustomUser


# Create your models here.

class Room(models.Model):
    name = models.CharField(max_length=200, null=True)
    members = models.ManyToManyField(CustomUser, related_name='members_rooms')

    def set_name(self, name: str) -> None:
        self.name = name

    def get_name(self) -> str:
        return self.name

    def __str__(self):
        return self.name if self.name else f"Room:{self.id}"


class Message(models.Model):
    author = models.ForeignKey(CustomUser, models.CASCADE, related_name='messages')
    text = models.TextField(max_length=1000)
    room = models.ForeignKey(Room, models.CASCADE, related_name='room_messages')
    liked = models.BooleanField(blank=True)

    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.text[:20]
