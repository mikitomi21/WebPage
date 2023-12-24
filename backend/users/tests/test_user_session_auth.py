from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from users.factories import UserFactory


class SessionAuthCsrfTokenTests(APITestCase):
    def setUp(self):
        self.password = 'secret12345'
        self.user = UserFactory(password=self.password)
        self.login_url = reverse('login')
        self.secured_endpoint_url = reverse('customuser-list')
        self.data = {'email': self.user.email, 'password': self.password}

    def test_session_authentication(self):
        response = self.client.post(self.login_url, self.data, format='json')

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('auth_token', response.data)
        self.assertIn('csrftoken', response.cookies)
        self.assertIn('sessionid', response.cookies)

        secured_endpoint_url = reverse('customuser-list')
        response = self.client.get(secured_endpoint_url)

        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_access_secured_endpoint_without_authentication(self):
        response = self.client.get(self.secured_endpoint_url)

        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
