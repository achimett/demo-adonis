#!/bin/bash

echo 'Taking down those DBs'
docker container stop mariadb_adonis redis_adonis
docker container rm mariadb_adonis redis_adonis
echo 'Done. Bye!'
