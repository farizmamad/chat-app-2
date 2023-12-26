import { Test, TestingModule } from '@nestjs/testing';
import { BroadcastersService } from './broadcasters.service';

describe('ReceiversService', () => {
  let service: BroadcastersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BroadcastersService],
    }).compile();

    service = module.get<BroadcastersService>(BroadcastersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
