#!/bin/bash

docker pull wiremock/wiremock:2.35.0
docker run --name rangiffler-mock -p 8080:8080 -v ./wiremock/rest:/home/wiremock -d wiremock/wiremock:2.35.0 --global-response-templating --enable-stub-cors
