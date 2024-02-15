import { Test, TestingModule } from '@nestjs/testing';
import { PriceProductRecommendedService } from './price_product_recommended.service';

describe('PriceProductRecommendedService', () => {
  let service: PriceProductRecommendedService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PriceProductRecommendedService],
    }).compile();

    service = module.get<PriceProductRecommendedService>(PriceProductRecommendedService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
