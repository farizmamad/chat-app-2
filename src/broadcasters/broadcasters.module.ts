import { Module } from '@nestjs/common';
import { BroadcastersService } from './broadcasters.service';
import { BroadcastersGateway } from './broadcasters.gateway';

@Module({
  providers: [BroadcastersGateway, BroadcastersService],
})
export class ReceiversModule {}
