#!/bin/bash

echo 'Welcome to the MariaDB Container initializer script'

DIRECTORY='datadir'
DBVERSION='10.5'

if [ -d "$PWD/$DIRECTORY" ]; then
  echo 'Starting MariaDB Docker Container'
  # shellcheck disable=SC2086
  docker run -p 127.0.0.1:3306:3306 --name mariadb -v $PWD/$DIRECTORY:/var/lib/mysql -d mariadb:$DBVERSION
  echo 'Remember to wait at least 5 sec for complete DB startup'
else
  echo 'Creating local database folder'
  mkdir "$PWD/$DIRECTORY"

  echo 'Starting MariaDB Docker Container'
  # shellcheck disable=SC2086
  docker run -p 127.0.0.1:3306:3306 --name mariadb -v $PWD/$DIRECTORY:/var/lib/mysql -e MARIADB_ROOT_PASSWORD=password -d mariadb:$DBVERSION

  echo 'Waiting 60 sec for complete DB startup'
  sleep 60

  echo 'Creating database adonis'
  mysql --host="127.0.0.1" --port="3306" --user="root" --password="password" --execute="CREATE DATABASE adonis; USE adonis"
fi
