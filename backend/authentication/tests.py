import json

from rest_framework.test import APITestCase
from .models import CustomUser
from django.urls import reverse


class TestAuthentication(APITestCase):
    def setUp(self) -> None:
        self.user = CustomUser(
            first_name='test_first_name',
            last_name='test_last_name',
            username='test_username',
            email='test@gmail.com',
            password='zaq1@WSX',
            avatar=None
        )
        self.user.save()

    def tearDown(self) -> None:
        self.user.delete()

    def test_login_user(self):
        login_url = reverse("login")
        login_data = {
            "password": self.user.password,
            "email": self.user.email,
        }
        # response = self.client.login(email="jakub@gmail.com", password="zaq1@WSX")
        response = self.client.post(login_url, login_data)
        self.assertEqual(response.status_code, 200)
