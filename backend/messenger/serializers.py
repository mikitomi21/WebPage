from rest_framework import serializers
from .models import Message, Room
from authentication.serializers import CustomUserSerializer
from authentication.models import CustomUser


class MessageSerializer(serializers.ModelSerializer):
    author = CustomUserSerializer(read_only=True)
    # room = RoomSerializer(read_only=True)

    class Meta:
        model = Message
        fields = ('id', 'author', 'text', 'liked')


class RoomSerializer(serializers.ModelSerializer):
    members = serializers.PrimaryKeyRelatedField(many=True, queryset=CustomUser.objects.all())
    messages = MessageSerializer(read_only=True, many=True)

    class Meta:
        model = Room
        fields = ('id', 'name', 'members', 'messages')
