import { Module } from '@nestjs/common';
import { ChatsService } from './chats.service';
import { ChatsGateway } from './chats.gateway';
import { ChatsController } from './chats.controller';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

@Module({
  providers: [
    {
      provide: 'QUEUE_SERVICE',
      useFactory: (configService: ConfigService) => {
        const rabbitmqUrl = configService.get<string>('rabbitmq.url');
        const rabbitmqQueue = configService.get<string>('rabbitmq.queue');
        return ClientProxyFactory.create({
          transport: Transport.RMQ,
          options: {
            urls: [rabbitmqUrl],
            queue: rabbitmqQueue,
            queueOptions: {
              durable: true,
            },
          },
        });
      },
      inject: [ConfigService],
    },
    ChatsGateway,
    ChatsService,
  ],
  controllers: [ChatsController],
})
export class ChatsModule {}
