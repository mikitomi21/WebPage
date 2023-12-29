
Backend init
```
./init.sh
```
Delete all data in database
```
docker compose run --rm django cleardatabase
```
Create admin user
```
docker compose run --rm django createsuperuseradmin
```
Create default data
```
docker compose run --rm django createdefaultdata
```
Run tests
```
docker compose run --rm django test
```
Run flake8
```
docker compose run --rm django flake8
```
Open shell
```
docker compose run --rm django shell
```