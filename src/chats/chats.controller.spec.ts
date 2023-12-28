import { Test, TestingModule } from '@nestjs/testing';
import { ChatsController } from './chats.controller';
import { ChatsGateway } from './chats.gateway';

describe('ChatsController', () => {
  let controller: ChatsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ChatsController],
      providers: [{
        provide: ChatsGateway,
        useValue: {},
      }]
    }).compile();

    controller = module.get<ChatsController>(ChatsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
