from django.contrib.auth.base_user import AbstractBaseUser
from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.

<<<<<<< HEAD
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
=======
class Item(models.Model):
    name = models.CharField(max_length=200)
    created = models.DateTimeField(auto_now_add=True)
>>>>>>> 9e95069520c6701cfd946f12d94e0d3a7bce0b1b
