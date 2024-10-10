ARG ALLURE_DOCKER_API
ARG BUILD_URL
ARG HEAD_COMMIT_MESSAGE
ARG EXECUTION_TYPE

FROM eclipse-temurin:21-jdk

ENV ALLURE_DOCKER_API=${ALLURE_DOCKER_API}
ENV BUILD_URL=${BUILD_URL}
ENV HEAD_COMMIT_MESSAGE=${HEAD_COMMIT_MESSAGE}
ENV EXECUTION_TYPE=${EXECUTION_TYPE}

WORKDIR /rangiffler
COPY ./gradle ./gradle
COPY ./rangiffler-e2e ./rangiffler-e2e
COPY ./gradlew ./
COPY ./build.gradle ./
COPY ./settings.gradle ./
COPY ./gradle.properties ./

CMD ./gradlew test -Dtest.env=docker
