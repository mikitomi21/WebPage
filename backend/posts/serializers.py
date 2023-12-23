from rest_framework import serializers
from .models import Post, Comment
from users.serializers import CustomUserSerializer


class CommentSerializer(serializers.ModelSerializer):
    author = CustomUserSerializer(read_only=True)
    post = serializers.PrimaryKeyRelatedField(queryset=Post.objects.all())

    class Meta:
        model = Comment
        fields = ('id', 'author', 'post', 'text', 'likes')


class PostSerializer(serializers.ModelSerializer):
    author = CustomUserSerializer(read_only=True)
    comments = CommentSerializer(read_only=True, many=True)

    class Meta:
        model = Post
        fields = ('id', 'author', 'title', 'text', 'comments', 'likes')
