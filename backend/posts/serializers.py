from rest_framework import serializers
from .models import Post, Comment
from authentication.serializers import CustomUserSerializer


class PostSerializer(serializers.ModelSerializer):
    author = CustomUserSerializer(read_only=True)

    class Meta:
        model = Post
        fields = ('author', 'title', 'text', 'likes')
        read_only_fields = ('author',)

class CommentSerializer(serializers.ModelSerializer):
    author = CustomUserSerializer(read_only=True)
    post = PostSerializer(read_only=True)

    class Meta:
        model = Comment
        fields = ('author', 'post', 'text', 'likes')
        read_only_fields = ('author', 'post', )