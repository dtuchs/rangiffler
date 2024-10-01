# Rangiffler

Демо проект для доклада [Тестирование GraphQL: почему это не просто POST-запрос?](https://ecode.ozon.tech/talks/309020437e004e6fad2861a9f08e77f9/?referer=/schedule/topics/ )

## Как запустить
#### Если у вас Windows - используйте bash (например, [git-bash](https://www.geeksforgeeks.org/working-on-git-bash/)) терминал
### Подготовка:
###### Используемые порты должны быть свободны:
3001, 9000, 8080
#### 1. Установить docker (Если не установлен)
[Установка на Windows](https://docs.docker.com/desktop/install/windows-install/)

[Установка на Mac](https://docs.docker.com/desktop/install/mac-install/)

[Установка на Linux](https://docs.docker.com/desktop/install/linux-install/)

- Запустите docker
- Убедитесь, что работают команды docker, например набрав в терминале `docker -v`

```posh
Docker version 26.0.0, build 2ae903e
```
#### 2. Установить пакетный менеджер для сборки front-end npm
[Инструкция](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm).
Рекомендованная версия Node.js - 18.13.0 (LTS)

#### 3. Убедитесь, что у вас установлена java версии 21 или новее
`java -version`

```posh
openjdk version "21.0.1" 2023-10-17 LTS
OpenJDK Runtime Environment Temurin-21.0.1+12 (build 21.0.1+12-LTS)
OpenJDK 64-Bit Server VM Temurin-21.0.1+12 (build 21.0.1+12-LTS, mixed mode)
```

### Локальный запуск в IDE

#### 1. Запустить БД, zookeeper, kafka и frontend
Выполните скрипт `bash localenv.sh`

#### 2. Запустить backend
- Запустить сервис rangiffler-auth

```posh
cd rangiffler-auth
gradle bootRun
```

Или просто перейдя к main-классу приложения RangifflerAuthApp выбрать run в IDEA 

- Запустить rangiffler-api, по аналогии с сервисов rangiffler-auth

#### 3. Открыть frontend в браузере
`http://127.0.0.1:3001`
