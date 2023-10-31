from django.contrib.auth.password_validation import validate_password
from djoser.conf import settings
from djoser.serializers import UserCreateMixin
from rest_framework import serializers
from rest_framework.settings import api_settings
from django.core import exceptions as django_exceptions
from authentication.models import CustomUser


class CustomUserSerializer(serializers.ModelSerializer):

    class Meta:
        model = CustomUser
        fields = (
            'id',
            'username',
            'first_name',
            'last_name',
            'email',
            'avatar'
        )


class UserCreateSerializer(UserCreateMixin, serializers.ModelSerializer):
    password = serializers.CharField(style={"input_type": "password"}, write_only=True)

    default_error_messages = {
        "cannot_create_user": settings.CONSTANTS.messages.CANNOT_CREATE_USER_ERROR
    }

    class Meta:
        model = CustomUser
        fields = (
            'email',
            'username',
            'password',
        )

    def validate(self, attrs):
        user = CustomUser(**attrs)
        password = attrs.get("password")

        try:
            validate_password(password, user)
        except django_exceptions.ValidationError as e:
            serializer_error = serializers.as_serializer_error(e)
            raise serializers.ValidationError(
                {"password": serializer_error[api_settings.NON_FIELD_ERRORS_KEY]}
            )

        return attrs
