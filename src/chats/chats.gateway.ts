import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer, WsException } from '@nestjs/websockets';
import { ChatsService } from './chats.service';
import { Server, Socket } from 'socket.io';
import { SendMessageDto } from './dto/send-message.dto';

@WebSocketGateway()
export class ChatsGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly chatsService: ChatsService) {}

  @SubscribeMessage('connection')
  handleConnection(socket: Socket) {
    const message = `${socket.id} joined`;
    const data: SendMessageDto = {
      text: message,
      senderId: socket.id,
    };
    this.chatsService.emitMessage(data);
  }

  @SubscribeMessage('disconnect')
  handleDisconnect(socket: Socket) {
    const message = `${socket.id} left`;
    const data: SendMessageDto = {
      text: message,
      senderId: socket.id,
    };
    this.chatsService.emitMessage(data);
  }

  @SubscribeMessage('sendMessage')
  handleSendMessage(@ConnectedSocket() socket: Socket, @MessageBody() message: string) {
    if (!socket) throw new WsException('No socket connected');
    const data: SendMessageDto = {
      senderId: socket.id,
      text: message,
    };
    this.chatsService.emitMessage(data);
    return { data };
  }

  async handleMessageSent(data: SendMessageDto) {
    this.chatsService.handleMessageSent(this.server, data)
  }
}
