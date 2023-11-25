#!/usr/bin/env bash
set -e

running_containers=$(docker ps -f name=sharespace_* -aq)

if [[ $running_containers ]]; then
    echo "Stopping running containers..."
    docker stop $running_containers
    echo "Removing stopped containers..."
    docker rm $running_containers
fi

echo "Executing makemigrations..."
docker compose run --rm django makemigrations

echo "Executing migrate..."
docker compose run --rm django migrate

echo "Creating default data..."
docker compose run --rm django createdefaultdata
echo "Creating admin user..."
docker compose run --rm django createsuperuseradmin
