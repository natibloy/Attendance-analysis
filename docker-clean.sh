#!/bin/bash

# stop the containers:
docker-compose stop
# delete all containers:
if [[ -n $(docker ps -a -q) ]]; then
    docker rm -f $(docker ps -a -q)
fi
# delete all volumes:
if [[ -n $(docker volume ls -q) ]]; then
    docker volume rm $(docker volume ls -q)
fi
docker-compose rm -f
docker-compose pull