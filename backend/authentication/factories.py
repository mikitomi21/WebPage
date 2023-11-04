import random
import factory
from django.contrib.auth import get_user_model
from faker import Faker

fake = Faker("pl_PL")


class UserFactory(factory.django.DjangoModelFactory):
    first_name = factory.LazyFunction(fake.first_name)
    last_name = factory.LazyFunction(fake.last_name)
    username = factory.LazyAttribute(
        lambda obj: f'{obj.first_name.lower()}.{obj.last_name.lower()}{random.randint(1, 100)}'
    )
    email = factory.LazyAttribute(lambda obj: f'{obj.first_name}.{obj.last_name}@example.com')

    @factory.post_generation
    def set_email_as_password(self, create, extracted, **kwargs):
        if not self.password:
            self.set_password(self.email)
        else:
            self.set_password(self.password)

    class Meta:
        model = get_user_model()
        django_get_or_create = ('email',)
