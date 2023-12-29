# CHAT APP 2

## Description

A chat app build on top of Node.js (NestJS) using socket communication and message queue.

## Installation

```bash
$ npm install
```

## Build docker image for chat-app
Build docker image for the chat-app. Here presented the template. Replace `my-chat-app` with your image name.

```bash
$ docker build -t my-chat-app  -t my-chat-app:0.0.1 .

# example
$ docker build -t farizmamad/chat-app-2  -t farizmamad/chat-app-2:0.0.1 .
```

## create user-defined network
This is required to allow communication between chat-app container and rabbitmq container.

First, inspect if the network already exists.
```bash
$ docker network inspect chat_app_net
```

if it responses with `Error response from daemon: network chat_app_net not found`, then run the command below. Otherwise, skip it.

```bash
$ docker network create chat_app_net
```

## Pull docker image of RabbitMQ
The image pulled is the one with tag management.

First, inspect if the image already exists.
```bash
$ docker inspect rabbitmq:3-management
```

if it responses with `Error: No such object: rabbitmq:3-management`, then run the command below. Otherwise, skip it.

```bash
$ docker pull rabbitmq:3-management
```

## Run RabbitMQ in docker with user-defined network
```bash
$ docker run -d --network chat_app_net --hostname rabbitmqhost \
   --name rabbitmq -p 15672:15672 -p 5672:5672 rabbitmq:3-management
```
If docker gives `Error response from daemon: Conflict. The container name "/rabbitmq" is already in use`, \
then continue to the next step.

## Change the Docker provider host to the DOCKER ENDPOINT of your Docker Desktop
This step is required to tell terraform where is the docker host.

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

## Init Terraform
```bash
$ terraform init -upgrade
```

## Apply Terraform

```bash
$ terraform apply
```

If a prompt asked `Do you want to perform these actions?`, Enter `yes`. Then, wait until the job finished. 
The end remarks should be `Apply complete! Resources: 1 added, 0 changed, 0 destroyed.`.

## Open Websocket/socket.io client
For example: Postman.

## Stay in touch

- Creator - [Ahmad Fariz](https://www.linkedin.com/in/ahmadfariz)

## License

Nest is [GNU General Public License version 3](LICENSE).
