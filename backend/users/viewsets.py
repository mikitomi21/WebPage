from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.decorators import action
from .models import CustomUser
from rest_framework.response import Response
from djoser.views import UserViewSet as DjoserUserViewSet
from .serializers import CustomUserSerializer


class CustomUserViewSet(DjoserUserViewSet):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer

    @action(detail=True, methods=['POST'])
    def add_friend(self, request, id):
        user = request.user
        friend = get_object_or_404(CustomUser, id=id)

        if user == friend:
            return Response({"error": f"{user} can't add yourself to friends"}, status=status.HTTP_400_BAD_REQUEST)
        if not user.friends.filter(id=friend.id).exists():
            user.add_friend(friend)
            friend.add_friend(user)
            return Response({"message": f"{user} and {friend} are new friends"}, status=status.HTTP_200_OK)

        return Response({"error": f"Can't connect {user} and {friend}, because they are friends"},
                        status=status.HTTP_400_BAD_REQUEST)
