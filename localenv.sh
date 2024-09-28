#!/bin/bash

echo '### Stop and remove containers ###'
docker stop $(docker ps -a -q)
docker rm $(docker ps -a -q)

echo '### Pull docker images ###'
docker pull mysql:8.3.0

echo '### Run databases ###'
docker run --name rangiffler-all-db -p 3306:3306 -e MYSQL_ROOT_PASSWORD=secret -v rangiffler:/var/lib/mysql -d mysql:8.3.0

echo '### Run client ###'
cd rangiffler-gql-client
npm i
npm run dev