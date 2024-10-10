#!/bin/bash
export FRONT_VERSION="1.0"
export ARCH=$(uname -m)

docker compose down
bash ./gradlew clean
if [ "$1" = "push" ]; then
  echo "### Build & push images ###"
  bash ./gradlew jib -x :rangiffler-e2e:test
  docker compose push client.rangiffler.dc
else
  echo "### Build images ###"
  bash ./gradlew jibDockerBuild -x :rangiffler-e2e:test
fi

docker image prune -f
docker compose up -d
docker ps -a
