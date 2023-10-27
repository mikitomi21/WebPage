from django.urls import path
from . import views

urlpatterns = [
    path('', views.get_data),
<<<<<<< HEAD
    path('add/', views.add_data),
=======
>>>>>>> 9e95069520c6701cfd946f12d94e0d3a7bce0b1b
]