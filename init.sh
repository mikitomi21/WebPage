#!/usr/bin/env bash
set -e

PROJECT_DIR=$(git rev-parse --show-toplevel)
ROOT=$(basename "${PROJECT_DIR}")
PROJECT_NAME=app

running_containers=$(docker ps -f name=sharespace_* -aq)

if [[ $running_containers ]]; then
    echo "Stopping running containers..."
    docker stop $running_containers
    echo "Removing stopped containers..."
    docker rm $running_containers
fi


echo "Removing unused containers (this may take a while)..."
docker container prune --force

echo "Removing docker volumes..."
volumes="${ROOT}_postgres_data"

docker volume rm -f ${volumes}

sleep 10

echo "Executing makemigrations..."
docker compose run --rm django makemigrations

echo "Executing migrate..."
docker compose run --rm django migrate

echo "Creating default data..."
docker compose run --rm django createdefaultdata
echo "Creating admin user..."
docker compose run --rm django createsuperuseradmin
echo "Collecting staticfiles..."
docker compose run --rm django collectstatic
