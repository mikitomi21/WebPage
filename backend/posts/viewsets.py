from rest_framework import status
from rest_framework.decorators import action
from rest_framework.viewsets import ModelViewSet
from .models import Post, Comment
from .serializers import PostSerializer, CommentSerializer
from rest_framework.response import Response


class PostViewSet(ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer

    def perform_create(self, serializer):
        author = self.request.user
        likes = self.request.likes
        serializer.save(author=author, likes=likes)

    @action(detail=True, methods=['POST'])
    def add_like(self, request, pk) -> Response:
        post = Post.objects.get(id=pk)
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
        post = self.request.post
        likes = self.request.likes
        serializer.save(author=author, post=post, likes=likes)

    @action(detail=True, methods=['POST'])
    def add_like(self, request, pk) -> Response:
        comment = Comment.objects.get(id=pk)
        user = request.user

        if not comment.likes.filter(id=user.id).exists():
            comment.add_like(user)
            return Response({"message": f"Comment liked by {user}"}, status=status.HTTP_200_OK)
        return Response({"error": f"Comment was liked by {user}"}, status=status.HTTP_400_BAD_REQUEST)
