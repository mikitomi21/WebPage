from rest_framework import serializers
from models import Message
from authentication.serializers import CustomUserSerializer


class MessageSerializer(serializers.ModelSerializer):
    author = CustomUserSerializer(read_only=True)
    receiver = CustomUserSerializer(read_only=True)

    class Meta:
        model = Message
        fields = ('id', 'author', 'receiver', 'text', 'liked')
