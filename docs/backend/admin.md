## Admin Panel

Go to http://0.0.0.0:8000/admin/ to perform admin actions and view data

Login as superuser, default superuser credentials:
```
SUPERUSER_USERNAME = 'admin
SUPERUSER_EMAIL = 'admin@example.com
SUPERUSER_PASSWORD = 'password
```

If you are uanable to login with provided credentials, check if superuser was created in init.sh or createsuperuseradmin command.
Visit [Snippets](docs/backend/snippets.md) for more info.
Additionally, check if credentials didn't change in `/backend/config/settings.py`
