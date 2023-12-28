# CHAT APP 2

## Description

A chat app build on top of Node.js (NestJS) using socket communication and message queue.

## Installation

```bash
$ npm install
```

## create user-defined network
```bash
$ docker network create chat_app_net
```

## Run RabbitMQ in docker with user-defined network
```bash
$ docker run -d --network chat_app_net --hostname rabbitmqhost \
   --name rabbitmq -p 15672:15672 -p 5672:5672 rabbitmq:3-management
```

## Build docker image for chat-app
Build docker image for the chat-app

```bash
$ docker build -t my-chat-app  -t my-chat-app:0.0.1 .

# example
$ docker build -t farizmamad/chat-app-2  -t farizmamad/chat-app-2:0.0.1 .
```

## Change the Docker provider host to the DOCKER ENDPOINT of your Docker Desktop
```bash
$ docker context ls
```
Then copy the value of DOCKER ENDOPOINT of the context with DESCRIPTION = Docker Desktop.
Paste the value to main.tf provider "docker" host.

```bash
# example
provider "docker" {
  host = "unix:///Users/home/.docker/run/docker.sock"
}
```

## Apply Terraform

```bash
$ terraform apply
```

## Open Postman


## Stay in touch

- Creator - [Ahmad Fariz](https://www.linkedin.com/in/ahmadfariz)

## License

Nest is [GNU General Public License version 3](LICENSE).
