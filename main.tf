terraform {
  required_providers {
    docker = {
      source  = "kreuzwerker/docker"
      version = "~> 3.0.1"
    }
    rabbitmq = {
      source = "cyrilgdn/rabbitmq"
      version = "~> 1.8.0"
    }
  }
}

provider "docker" {
  host = "unix:///Users/home/.docker/run/docker.sock"
}

provider "rabbitmq" {
  endpoint = "http://127.0.0.1:15672"
  username = "guest"
  password = "guest"
}

resource "rabbitmq_vhost" "vhost_1" {
  provider = rabbitmq
  name = "vhost_1"
}

resource "rabbitmq_permissions" "guest" {
  provider = rabbitmq
  user  = "guest"
  vhost = "${rabbitmq_vhost.vhost_1.name}"

  permissions {
    configure = ".*"
    write     = ".*"
    read      = ".*"
  }
}

resource "rabbitmq_queue" "nginx-logs" {
  provider = rabbitmq
  name  = "chatText"
  vhost = "${rabbitmq_permissions.guest.vhost}"

  settings {
    durable = true
  }
}

# start a container
resource "docker_container" "chat_app_2" {
  image = "farizmamad/chat-app-2"
  name  = "chat-app-2"

  ports {
    internal = 3000
    external = 3000
  }

  networks_advanced {
    name = "chat_app_net"
  }
}
