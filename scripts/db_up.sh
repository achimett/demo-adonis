#!/bin/bash

echo 'Welcome to the MariaDB & Redis Container initializer script'

DIRECTORY='datadir'
MARIADBDB_VERSION='10.5'
REDIS_VERSION='6.2-alpine'

if [ -d "$PWD/$DIRECTORY" ]; then
  echo 'Starting MariaDB Docker Container'
  # shellcheck disable=SC2086
  docker run -p 127.0.0.1:3306:3306 --name mariadb_adonis -v $PWD/$DIRECTORY:/var/lib/mysql -d mariadb:$MARIADBDB_VERSION
  echo 'Waiting 5 sec for DB startup'
  sleep 5
else
  echo 'Creating local database folder'
  mkdir "$PWD/$DIRECTORY"

  echo 'Starting MariaDB Docker Container'
  # shellcheck disable=SC2086
  docker run -p 127.0.0.1:3306:3306 --name mariadb_adonis -v $PWD/$DIRECTORY:/var/lib/mysql -e MARIADB_ROOT_PASSWORD=password -d mariadb:$MARIADBDB_VERSION

  echo 'Waiting 60 sec for complete DB startup'
  sleep 60

  echo 'Creating database adonis'
  mysql --host="127.0.0.1" --port="3306" --user="root" --password="password" --execute="CREATE DATABASE adonis; USE adonis"
fi

echo 'Starting Redis Docker Container'
# shellcheck disable=SC2086
docker run -p 127.0.0.1:6379:6379 --name redis_adonis -v $PWD/$DIRECTORY:/data -d redis:$REDIS_VERSION redis-server --appendonly yes
echo 'Waiting 5 sec for Redis startup'
sleep 5

echo 'All done! May the force be with you.'
