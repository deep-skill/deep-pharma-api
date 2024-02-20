import { Test, TestingModule } from '@nestjs/testing';
import { SuggestedPriceService } from './suggested_price.service';

describe('SuggestedPriceService', () => {
  let service: SuggestedPriceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SuggestedPriceService],
    }).compile();

    service = module.get<SuggestedPriceService>(SuggestedPriceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
