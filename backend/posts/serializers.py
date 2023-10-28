from rest_framework import serializers
from .models import Post
from authentication.serializers import CustomUserSerializer


class PostSerializer(serializers.ModelSerializer):
    author = CustomUserSerializer(read_only=True)

    class Meta:
        model = Post
        fields = ('author', 'title', 'text')
        read_only_fields = ('author',)
