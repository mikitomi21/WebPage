To run all backend tests

```
docker compose run --rm django test
```

To run a specific test add path to this test.
For example test_user_creation

```
docker compose run --rm django test users.tests.test_user.TestUser.test_user_creation
```