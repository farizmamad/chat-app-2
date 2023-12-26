import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { BroadcastersService } from './broadcasters.service';
import { Socket } from 'socket.io';
import { SendMessageDto } from './dto/send-message.dto';

@WebSocketGateway()
export class BroadcastersGateway {
  constructor(private readonly broadcastersGateway: BroadcastersService) {}

  @SubscribeMessage('sendMessage')
  handleEvent(
    @MessageBody() data: SendMessageDto, 
    @ConnectedSocket() client: Socket,
  ) {
    client.broadcast.emit('newMessage', data);
    return { event: 'newMessage', data };
  }
}
