from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from users.factories import UserFactory


class TestUserAuthToken(APITestCase):

    def setUp(self):
        self.login_url = reverse('login')
        self.logout_url = reverse('logout')
        self.user_detail_url = '/api/users'
        self.user = UserFactory()

    def test_user_auth_token_generation(self):
        data = {'email': self.user.email, 'password': self.user.email}
        response = self.client.post(self.login_url, data=data)
        self.assertEqual(status.HTTP_200_OK, response.status_code)
        self.assertIn('auth_token', response.data)
        self.assertIsNotNone(response.data['auth_token'])

    def test_user_auth_token_usage(self):
        data = {'email': self.user.email, 'password': self.user.email}
        response_login = self.client.post(self.login_url, data=data)
        self.assertEqual(status.HTTP_200_OK, response_login.status_code)
        auth_token = response_login.data.get('auth_token')

        protected_endpoint_url = f'{self.user_detail_url}/{self.user.id}/'
        response = self.client.get(protected_endpoint_url, HTTP_AUTHORIZATION=f'Token {auth_token}')
        self.assertEqual(status.HTTP_200_OK, response.status_code)
        self.assertEqual(response.data['id'], self.user.id)

    def test_user_auth_token_after_logout_not_valid(self):
        data = {'email': self.user.email, 'password': self.user.email}
        response_login = self.client.post(self.login_url, data=data)
        self.assertEqual(status.HTTP_200_OK, response_login.status_code)
        auth_token = response_login.data.get('auth_token')

        response_logout = self.client.post(self.logout_url, HTTP_AUTHORIZATION=f'Token {auth_token}')
        self.assertEqual(status.HTTP_204_NO_CONTENT, response_logout.status_code)

        protected_endpoint_url = f'{self.user_detail_url}/{self.user.id}/'
        response = self.client.get(protected_endpoint_url, HTTP_AUTHORIZATION=f'Token {auth_token}')
        self.assertEqual(status.HTTP_401_UNAUTHORIZED, response.status_code)

    def test_invalid_auth_token(self):
        protected_endpoint_url = f'{self.user_detail_url}/{self.user.id}/'
        invalid_auth_token = '12345'
        response = self.client.get(protected_endpoint_url, HTTP_AUTHORIZATION=f'Token {invalid_auth_token}')
        self.assertEqual(status.HTTP_401_UNAUTHORIZED, response.status_code)
