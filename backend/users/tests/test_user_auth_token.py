from django.urls import reverse
from users.factories import UserFactory
from django.conf import settings
from django.contrib.auth import user_logged_out
from django.test.utils import override_settings
from rest_framework import status
from rest_framework.reverse import reverse
from rest_framework.test import APITestCase
from common.test_utils import login_user


class TokenDestroyViewTest(APITestCase):
    def setUp(self):
        self.signal_sent = False
        self.base_url = reverse("logout")
        self.user = UserFactory()

    def signal_receiver(self, *args, **kwargs):
        self.signal_sent = True

    def test_post_should_logout_logged_in_user(self):
        user_logged_out.connect(self.signal_receiver)

        login_user(self.client, self.user)
        response = self.client.post(self.base_url)

        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(response.data, None)
        self.assertTrue(self.signal_sent)

    def test_post_should_deny_logging_out_when_user_not_logged_in(self):
        response = self.client.post(self.base_url)

        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_options(self):
        login_user(self.client, self.user)
        response = self.client.options(self.base_url)

        self.assertEqual(response.status_code, status.HTTP_200_OK)


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
