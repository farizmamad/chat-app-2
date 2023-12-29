# CHAT APP 2

## Description

A chat app build on top of Node.js (NestJS) using socket communication and message queue.

## Open terminal

## Installation

```bash
$ npm install
```

## Open Docker Desktop
```bash
$ open -a Docker
```

## Build docker image for chat-app
Build docker image for the chat-app. Here presented the template image name `farizmamad/chat-app-2`.

First, inspect if the image already exists.
```bash
$ docker inspect farizmamad/chat-app-2
```

if it responses with `Error: No such object: farizmamad/chat-app-2`, then run the command below. Otherwise, skip it.

```bash
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
Here presented prepare the client using `Postman`.
1. Open Postman.
2. Go to sidebar menu `Collections`.
3. Create new collection named `chat-api-2`.
4. Right click on the collection `chat-api-2`, choose `Add request`, choose `Socket.IO`.
5. Give the request name `client 1`.
6. Repeat the steps 4-5 with different request name to create multiple clients.
7. In each clients, enter URL `http://[::1]:3000`. Then, click `connect`.
8. In each clients, go to `Events` tab. Add new `Events` = `receiveMessage`. Set `LISTEN` toggle on for this event.
9. Go to 1 client. Go to `Message` tab. Try to send text message to event `SendMessage`.
10. After successfully send message from 1 client, check the other clients. The other clients should receive the message.
11. Repeat step 9-10 by sending message from another client.

## Stay in touch

- Creator - [Ahmad Fariz](https://www.linkedin.com/in/ahmadfariz)

## License

Nest is [GNU General Public License version 3](LICENSE).
