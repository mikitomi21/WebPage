from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from authentication.constants import Messages
from authentication.factories import UserFactory
from config import settings


class TestUser(APITestCase):

    def setUp(self) -> None:
        self.login_url = reverse('login')

    def test_login(self):
        user = UserFactory(email='test@example.com')
        user.set_password('123456789')
        user.save()

        data = {'email': 'test@example.com', 'password': '123456789'}
        response = self.client.post(self.login_url, data=data)
        self.assertEqual(status.HTTP_200_OK, response.status_code)
        self.assertIn('auth_token', response.data)

    def test_login_to_disabled_account(self):
        user = UserFactory(is_active=False)
        data = {'email': user.email, 'password': user.email}

        response = self.client.post(self.login_url, data=data)
        self.assertEqual(status.HTTP_400_BAD_REQUEST, response.status_code)

        actual_error_message = response.json().get(settings.NON_FIELD_ERRORS_KEY, [''])[0]
        expected_error_message = Messages.INACTIVE_ACCOUNT_ERROR

        self.assertEqual(expected_error_message, actual_error_message)

    def test_login_wrong_credentials(self):
        data = {'email': 'wrong@email.com', 'password': 'wrongpassword'}
        response = self.client.post(self.login_url, data=data)
        self.assertEqual(status.HTTP_400_BAD_REQUEST, response.status_code)

        actual_error_message = response.json().get(settings.NON_FIELD_ERRORS_KEY, [''])[0]
        expected_error_message = Messages.INVALID_CREDENTIALS_ERROR

        self.assertEqual(expected_error_message, actual_error_message)
