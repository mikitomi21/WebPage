from rest_framework import serializers
<<<<<<< HEAD
from profiles.models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
=======
from ..profiles.models import Item

class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
>>>>>>> 9e95069520c6701cfd946f12d94e0d3a7bce0b1b
        fields = '__all__'
