import { Test, TestingModule } from '@nestjs/testing';
import { BroadcastersGateway } from './broadcasters.gateway';
import { BroadcastersService } from './broadcasters.service';

describe('BroadcastersGateway', () => {
  let gateway: BroadcastersGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BroadcastersGateway, BroadcastersService],
    }).compile();

    gateway = module.get<BroadcastersGateway>(BroadcastersGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
