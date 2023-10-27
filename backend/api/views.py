from rest_framework.response import Response
from rest_framework.decorators import api_view
from profiles.models import Item
from .serializers import ItemSerializer

@api_view(['GET'])
def get_data(request):
    person = {'name': 'Kuba', 'age': 22}
    item = Item("Siema")
    return Response(person)