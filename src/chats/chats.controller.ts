import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { SendMessageDto } from './dto/send-message.dto';
import { ChatsGateway } from './chats.gateway';

@Controller('chats')
export class ChatsController {
  constructor(private readonly chatsGateway: ChatsGateway) {}

  @EventPattern('messageSent')
  async handleMessageSent(data: SendMessageDto) {
    this.chatsGateway.handleMessageSent(data);
  }
}
