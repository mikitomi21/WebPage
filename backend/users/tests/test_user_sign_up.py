from django.conf import settings
from django.test import override_settings
from rest_framework import status
from rest_framework.test import APITestCase


class TestUserSignUp(APITestCase):

    @classmethod
    def setUpTestData(cls):
        cls.register_url = '/api/users/'
        cls.registration_valid_email = 'example@test.com'
        cls.registration_valid_data = {
            'username': 'johndoe123',
            'email': cls.registration_valid_email,
            'first_name': 'John',
            'last_name': 'Doe',
            'password': 'Fdashrafalkcadn123',
        }

    def test_user_sign_up(self):
        response = self.client.post(self.register_url, data=self.registration_valid_data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    @override_settings(MINIMUM_PASSWORD_LENGTH=10)
    def test_sign_up_with_too_short_password(self):
        expected_error_message = (
            f'This password is too short. It must contain at least {settings.MINIMUM_PASSWORD_LENGTH} characters.'
        )
        response = self.client.post(
            self.register_url, data=self.registration_valid_data | {'password': 'short'}
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        data = response.data
        self.assertIn('password', data)
        self.assertEqual(data['password'][0].strip(), expected_error_message.strip())

    def test_sign_up_with_wrong_email(self):
        expected_error_message = 'Enter a valid email address.'
        response = self.client.post(
            self.register_url, data=self.registration_valid_data | {'email': 'wrong_email'}
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        data = response.data
        self.assertIn('email', data)
        self.assertEqual(data['email'][0].strip(), expected_error_message.strip())

    def test_sign_up_with_same_email(self):
        response_existing_user = self.client.post(self.register_url, data=self.registration_valid_data)
        self.assertEqual(response_existing_user.status_code, status.HTTP_201_CREATED)

        duplicate_user_data = self.registration_valid_data | {'username': 'test'}
        response = self.client.post(self.register_url, data=duplicate_user_data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        data = response.data
        self.assertIn('email', data)
        self.assertEqual(data['email'][0], 'user with this email already exists.')

    def test_sign_up_with_same_username(self):
        response_existing_user = self.client.post(self.register_url, data=self.registration_valid_data)
        self.assertEqual(response_existing_user.status_code, status.HTTP_201_CREATED)

        duplicate_user_data = self.registration_valid_data | {'email': 'new_email@example.com'}
        response = self.client.post(self.register_url, data=duplicate_user_data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        data = response.data
        self.assertIn('username', data)
        self.assertEqual(data['username'][0], 'A user with that username already exists.')

    def test_sign_up_with_missing_email(self):
        response = self.client.post(
            self.register_url, data=self.registration_valid_data | {'email': ''}
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        data = response.data
        self.assertIn('email', data)
        self.assertEqual(data['email'][0], 'This field may not be blank.')

    def test_sign_up_with_missing_password(self):
        response = self.client.post(
            self.register_url, data=self.registration_valid_data | {'password': ''}
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        data = response.data
        self.assertIn('password', data)
        self.assertEqual(data['password'][0], 'This field may not be blank.')

    def test_sign_up_with_missing_username(self):
        response = self.client.post(
            self.register_url, data=self.registration_valid_data | {'username': ''}
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        data = response.data
        self.assertIn('username', data)
        self.assertEqual(data['username'][0], 'This field may not be blank.')
