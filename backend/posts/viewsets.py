from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.decorators import action
from rest_framework.viewsets import ModelViewSet
from .models import Post, Comment, CustomUser
from .serializers import PostSerializer, CommentSerializer
from rest_framework.response import Response


class PostViewSet(ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer

    def perform_create(self, serializer):
        author = self.request.user
        serializer.save(author=author)

    @action(detail=True, methods=['POST'])
    def add_like(self, request, pk) -> Response:
        post = get_object_or_404(Post, id=pk)
        user = request.user

        if not post.likes.filter(id=user.id).exists():
            post.add_like(user)
            return Response({"message": f"Post liked by {user}"}, status=status.HTTP_200_OK)
        return Response({"error": f"Post was liked by {user}"}, status=status.HTTP_400_BAD_REQUEST)


class CommentViewSet(ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer

    def perform_create(self, serializer):
        author = self.request.user
        post = serializer.validated_data.get('post')
        serializer.save(author=author, post=post)


    @action(detail=True, methods=['POST'])
    def add_like(self, request, pk) -> Response:
        comment = get_object_or_404(Comment, id=pk)
        user = request.user

        if not comment.likes.filter(id=user.id).exists():
            comment.add_like(user)
            return Response({"message": f"Comment liked by {user}"}, status=status.HTTP_200_OK)
        return Response({"error": f"Comment has been liked liked by {user}"}, status=status.HTTP_400_BAD_REQUEST)
