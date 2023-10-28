from authentication.models import CustomUser
from django.db import models


class Post(models.Model):
    author = models.ForeignKey(CustomUser, models.CASCADE, 'posts')
    title = models.CharField(max_length=100, null=True)
    text = models.TextField(max_length=2000)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'{self.title} - {self.author}'
