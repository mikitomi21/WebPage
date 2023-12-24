from django.conf import settings
from django.test.utils import override_settings
from rest_framework import status
from rest_framework.reverse import reverse
from rest_framework.test import APITestCase
from common.test_utils import login_user
from users.factories import UserFactory


class SetPasswordViewTest(APITestCase):
    def setUp(self):
        self.base_url = reverse("customuser-set-password")
        self.current_password = 'secret12345'
        self.user = UserFactory(password=self.current_password)

    def test_post_set_new_password(self):
        data = {"new_password": "new password", "current_password": self.current_password}
        login_user(self.client, self.user)
        response = self.client.post(self.base_url, data)

        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.user.refresh_from_db()
        self.assertTrue(self.user.check_password(data["new_password"]))

    @override_settings(DJOSER=dict(settings.DJOSER, **{"SET_PASSWORD_RETYPE": True}))
    def test_post_set_new_password_with_retype(self):
        data = {
            "new_password": "new password",
            "re_new_password": "new password",
            "current_password": self.current_password,
        }
        login_user(self.client, self.user)

        response = self.client.post(self.base_url, data)
        self.assertTrue(response.status_code, status.HTTP_204_NO_CONTENT)
        self.user.refresh_from_db()
        self.assertTrue(self.user.check_password(data["new_password"]))

    def test_post_not_set_new_password_if_wrong_current_password(self):
        data = {"new_password": "new password", "current_password": "wrong"}
        login_user(self.client, self.user)

        response = self.client.post(self.base_url, data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    @override_settings(DJOSER=dict(settings.DJOSER, **{"SET_PASSWORD_RETYPE": True}))
    def test_post_not_set_new_password_if_mismatch(self):
        data = {
            "new_password": "new password",
            "re_new_password": "wrong",
            "current_password": self.current_password,
        }
        login_user(self.client, self.user)

        response = self.client.post(self.base_url, data)

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.user.refresh_from_db()
        self.assertTrue(self.user.check_password(data["current_password"]))

    def test_post_not_set_new_password_if_fails_validation(self):
        data = {
            "new_password": "666",
            "re_new_password": "666",
            "current_password": self.current_password,
        }
        login_user(self.client, self.user)

        expected_error_messages = [
            'This password is too short. It must contain at least 10 characters.',
            'This password is too common.',
            'This password is entirely numeric.'
        ]

        response = self.client.post(self.base_url, data)
        actual_error_messages = response.json().get('new_password', [])
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

        for expected_error_message in expected_error_messages:
            self.assertIn(expected_error_message, actual_error_messages)

        self.assertEqual(len(actual_error_messages), len(expected_error_messages))
        self.user.refresh_from_db()
        self.assertFalse(self.user.check_password(data["new_password"]))
