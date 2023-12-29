from rest_framework import serializers
from .models import Post, Comment
from users.serializers import UserSerializer


class CommentSerializer(serializers.ModelSerializer):
    author = UserSerializer(read_only=True)
    post = serializers.PrimaryKeyRelatedField(queryset=Post.objects.all())

    class Meta:
        model = Comment
        fields = ('id', 'author', 'post', 'text', 'likes')


class PostCommentSerializer(serializers.ModelSerializer):
    author = UserSerializer(read_only=True)

    class Meta:
        model = Comment
        fields = ('id', 'author', 'text', 'likes')


class PostSerializer(serializers.ModelSerializer):
    author = UserSerializer(read_only=True)
    comments = PostCommentSerializer(read_only=True, many=True)

    class Meta:
        model = Post
        fields = ('id', 'author', 'title', 'text', 'comments', 'likes')
