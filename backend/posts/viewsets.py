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

class CommentViewSet(ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer

    def perform_create(self, serializer):
        author = self.request.user
        post = serializer.validated_data.get('post')
        serializer.save(author=author, post=post)

    @action(detail=True, methods=['POST'])
    def add_friend(self, request, pk):
        user = request.user
        friend = get_object_or_404(CustomUser, id=pk)

        if not user.friends.filter(id=user.id).exists():
            user.add_like(friend)
            friend.add_like(user)
            return Response({"message": f"{user} and {friend} are new friends"}, status=status.HTTP_200_OK)
        return Response({"error": f"Can't connect {user} and {friend}, because they are friends"}, status=status.HTTP_400_BAD_REQUEST)


