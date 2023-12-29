import { Test, TestingModule } from '@nestjs/testing';
import { ChatsService } from './chats.service';
import { ClientProxy } from '@nestjs/microservices';

describe('ChatsService', () => {
  let service: ChatsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: 'QUEUE_SERVICE',
          useValue: {},
        },
        ChatsService,
      ],
    }).compile();

    service = module.get<ChatsService>(ChatsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
