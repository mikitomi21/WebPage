from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from rest_framework.authtoken.models import Token
from users.factories import UserFactory
from users.models import CustomUser
from common.test_utils import login_user


class TestCustomUserAPI(APITestCase):

    def setUp(self):
        self.user1 = UserFactory()
        self.user2 = UserFactory()

    def authenticate(self, user):
        self.client.credentials(HTTP_AUTHORIZATION=f'Token {Token.objects.get(user=user).key}')

    def test_list_users(self):
        login_user(self.client, self.user1)
        response = self.client.get(reverse('customuser-list'))
        data = response.json()
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(data), CustomUser.objects.count())

    def test_retrieve_user(self):
        detail_url = reverse('customuser-detail', args=[self.user1.id])
        login_user(self.client, self.user1)
        response = self.client.get(detail_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['id'], self.user1.id)

    def test_add_friend(self):
        add_friend_url = reverse('customuser-add-friend', args=[self.user2.id])
        login_user(self.client, self.user1)
        response = self.client.post(add_friend_url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['message'], f"{self.user1} and {self.user2} are new friends")

        self.assertTrue(self.user1.friends.filter(id=self.user2.id).exists())
        self.assertTrue(self.user2.friends.filter(id=self.user1.id).exists())

    def test_add_self_as_friend(self):
        add_friend_url = reverse('customuser-add-friend', args=[self.user1.id])
        login_user(self.client, self.user1)
        response = self.client.post(add_friend_url, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data['error'], f"{self.user1} can't add yourself to friends")

    def test_add_existing_friend(self):
        self.user1.add_friend(self.user2)
        add_friend_url = reverse('customuser-add-friend', args=[self.user2.id])
        login_user(self.client, self.user1)
        response = self.client.post(add_friend_url, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(
            response.data['error'],
            f"Can't connect {self.user1} and {self.user2}, because they are friends"
        )
