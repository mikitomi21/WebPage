from rest_framework.response import Response
from rest_framework.decorators import api_view
from profiles.models import User
from .serializers import UserSerializer

@api_view(['GET'])
def get_data(request):
    item = User.objects.all()
    serializer = UserSerializer(item, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def add_data(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)