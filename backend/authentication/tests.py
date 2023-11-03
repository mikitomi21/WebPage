from django.test import TestCase
from .models import CustomUser


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

    def test_print_user(self):
        print(self.user)
        assert(self.user,2)
