from django.test import TestCase
from .models import CustomUser
from django.urls import reverse

class TestAuthentication(TestCase):
    def setUp(self) -> None:
        self.user = CustomUser(
            first_name='test_first_name',
            last_name='test_last_name',
            username='test_username',
            email='test@exampl.com',
            avatar=None
        )
        self.user.save()

    def tearDown(self) -> None:
        self.user.delete()

    def test_login_user(self):
        login_url = reverse('login')
        print("DUPA")
        print(login_url)
        print("DUPA")
        login_data = {
            "email": self.user.email,
            "password": self.user.password
        }
        response = self.client.post(login_url, login_data)
        print(self.client.post(login_url))
        self.assertEquals(response.status_code, 200)
