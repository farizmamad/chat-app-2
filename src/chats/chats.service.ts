import { Injectable } from '@nestjs/common';
import { Client, ClientProxy, EventPattern, Transport } from '@nestjs/microservices';
import { SendMessageDto } from './dto/send-message.dto';
import { Server } from 'socket.io';

@Injectable()
export class ChatsService {
  @Client({ transport: Transport.RMQ })
  client: ClientProxy;

  async emitMessage(data: SendMessageDto) {
    this.client.emit<number>('messageSent', data);
  }

  @EventPattern('messageSent')
  async handleMessageSent(server: Server, data: SendMessageDto) {
    console.log(data)
    server.sockets.emit('receiveMessage', data);
  }
}
