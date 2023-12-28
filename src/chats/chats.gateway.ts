import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { ChatsService } from './chats.service';
import { Server } from 'socket.io';
import { SendMessageDto } from './dto/send-message.dto';

@WebSocketGateway()
export class ChatsGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly chatsService: ChatsService) {}

  @SubscribeMessage('sendMessage')
  handleSendMessage(@MessageBody() data: SendMessageDto) {
    this.chatsService.emitMessage(data);
    return { data };
  }

  async handleMessageSent(data: SendMessageDto) {
    this.chatsService.handleMessageSent(this.server, data)
  }
}
