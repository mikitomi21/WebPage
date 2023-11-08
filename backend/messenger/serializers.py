from rest_framework import serializers
from models import Message
from authentication.serializers import CustomUserSerializer


class RoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = ('id', 'name', 'members')


class MessageSerializer(serializers.ModelSerializer):
    author = CustomUserSerializer(read_only=True)
    room = RoomSerializer(read_only=True)

    class Meta:
        model = Message
        fields = ('id', 'author','text', 'room', 'liked')
