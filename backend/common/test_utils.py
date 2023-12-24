from djoser.conf import settings as djoser_settings


def login_user(client, user):
    Token = djoser_settings.TOKEN_MODEL
    token = Token.objects.create(user=user)
    client.credentials(HTTP_AUTHORIZATION="Token " + token.key)
