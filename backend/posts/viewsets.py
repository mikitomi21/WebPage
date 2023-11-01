from rest_framework.viewsets import ModelViewSet
from .models import Post, Comment
from .serializers import PostSerializer, CommentSerializer


class PostViewSet(ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer

    def perform_create(self, serializer):
        author = self.request.user
        likes = self.request.likes
        serializer.save(author=author, likes=likes)


class CommentViewSet(ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer

    def perform_create(self, serializer):
        author = self.request.user
        post = self.request.post
        likes = self.request.likes
        serializer.save(author=author, post=post, likes=likes)
