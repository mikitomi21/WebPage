from rest_framework.viewsets import ModelViewSet
from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.decorators import action
from rest_framework.response import Response
from .serializers import MessageSerializer, RoomSerializer
from .models import Message, Room
from authentication.models import CustomUser


class RoomViewSet(ModelViewSet):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer

    @action(detail=True, methods=['POST'])
    def add_member(self, request, pk):
        room = self.get_object()
        user = get_object_or_404(CustomUser, id=pk)

        if user not in room.members.all():
            room.members.add(user)
            return Response({"message": f"{user} has been added to the room {room}"}, status.HTTP_200_OK)
        return Response({"error": f"{user} is already a member of the room {room}"}, status.HTTP_400_BAD_REQUEST)


class MessageViewSet(ModelViewSet):
    queryset = Message.objects.all()
    serializer_class = MessageSerializer

    def perform_create(self, serializer):
        author = self.request.user
        receiver = serializer.validated_data.get('post')
        serializer.save(author=author, receiver=receiver)

    @action(detail=True, methods=['POST'])
    def send_message(self, request, pk) -> Response:
        message = get_object_or_404(Message, id=pk)
        author = request.user

