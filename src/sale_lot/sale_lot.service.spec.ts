import { Test, TestingModule } from '@nestjs/testing';
import { SaleLotService } from './sale_lot.service';

describe('SaleLotService', () => {
  let service: SaleLotService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SaleLotService],
    }).compile();

    service = module.get<SaleLotService>(SaleLotService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
