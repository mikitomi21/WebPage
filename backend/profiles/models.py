from django.contrib.auth.base_user import AbstractBaseUser
from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.

class User(AbstractUser):
    username = models.CharField(max_length=100, unique=True)
    email = models.EmailField(unique=True)
    def __str__(self):
        return self.get_username()

class Post(models.Model):
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField()
    description = models.TextField(null=True, blank=True)
    created = models.DateTimeField(auto_now_add=True)
    # likes =


    def __str__(self):
        return self.name
