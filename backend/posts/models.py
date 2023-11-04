from authentication.models import CustomUser
from django.db import models


class Post(models.Model):
    author = models.ForeignKey(CustomUser, models.CASCADE, 'posts')
    title = models.CharField(max_length=100, null=True)
    text = models.TextField(max_length=2000)
    likes = models.ManyToManyField(CustomUser, related_name='liked_posts')

    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    def add_like(self, user: CustomUser) -> None:
        self.likes.add(user)

    def __str__(self):
        return f'{self.title} - {self.author}'


class Comment(models.Model):
    author = models.ForeignKey(CustomUser, models.CASCADE, 'comments')
    post = models.ForeignKey(Post, models.CASCADE, 'comments')
    text = models.TextField(max_length=2000)
    likes = models.ManyToManyField(CustomUser, related_name='liked_comments')

    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    def add_like(self, user: CustomUser) -> None:
        self.likes.add(user)

    def __str__(self):
        return f"{self.author}'s comments of {self.post.title}'s post"
