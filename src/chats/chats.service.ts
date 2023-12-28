import { Injectable } from '@nestjs/common';
import { Client, ClientProxy, Transport } from '@nestjs/microservices';
import { SendMessageDto } from './dto/send-message.dto';
import { Server } from 'socket.io';
import { WebSocketServer } from '@nestjs/websockets';

@Injectable()
export class ChatsService {
  @Client({ transport: Transport.RMQ, options: { queue: 'chatText' } })
  client: ClientProxy;

  async emitMessage(data: SendMessageDto) {
    this.client.emit<number>('messageSent', data);
  }

  async handleMessageSent(server: Server, data: SendMessageDto) {
    server.sockets.emit('receiveMessage', data);
  }
}
