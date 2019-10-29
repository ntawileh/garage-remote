#!/bin/bash -e

cd /home/pi/garage-remote
git pull
source .env.prod
if [ -z "$SERVER_NAME" ]; then
        echo "Missing environment variables"
        exit 1
fi 
docker-compose build
docker-compose up -d

exit 0