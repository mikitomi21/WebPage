from django.db import models
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 6b14c50 (add message)
from authentication.models import CustomUser


# Create your models here.

class Message(models.Model):
    author = models.ForeignKey(CustomUser, models.CASCADE)
    # TODO there could be more than one receiver (group)
    receiver = models.ForeignKey(CustomUser, models.CASCADE)
    text = models.TextField(max_length=1000)
    liked = models.BooleanField(blank=True)

    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.author}'s message to {self.receiver}"
<<<<<<< HEAD
=======

# Create your models here.
>>>>>>> 60d4514 (Add messenger app)
=======
>>>>>>> 6b14c50 (add message)
