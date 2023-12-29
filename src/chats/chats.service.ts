import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { SendMessageDto } from './dto/send-message.dto';
import { Server } from 'socket.io';

@Injectable()
export class ChatsService {
  constructor(@Inject('QUEUE_SERVICE') private client: ClientProxy) {}

  async emitMessage(data: SendMessageDto) {
    this.client.emit<number>('messageSent', data);
  }

  async handleMessageSent(server: Server, data: SendMessageDto) {
    server.sockets.except(data.senderId).emit('receiveMessage', data.text);
  }
}
