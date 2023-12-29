from django.test import TestCase
from users.factories import UserFactory
from users.models import CustomUser


class TestUser(TestCase):

    def test_default_avatar(self):
        user = UserFactory()
        self.assertIsNotNone(user.avatar)

    def test_add_friend(self):
        user1 = UserFactory()
        user2 = UserFactory()

        user1.add_friend(user2)

        self.assertIn(user2, user1.friends.all())
        self.assertIn(user1, user2.friends.all())

    def test_str_method(self):
        user = UserFactory()
        self.assertEqual(str(user), user.username)

    def test_unique_email(self):
        email = 'test@example.com'
        UserFactory(email=email)
        with self.assertRaises(Exception):
            CustomUser.objects.create(username='testuser', email=email)

    def test_user_creation(self):
        username = 'testuser'
        email = 'test@example.com'
        user = CustomUser.objects.create(username=username, email=email)

        self.assertEqual(user.username, username)
        self.assertEqual(user.email, email)
