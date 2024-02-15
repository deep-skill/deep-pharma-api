import { Test, TestingModule } from '@nestjs/testing';
import { PriceProductRecommendedController } from './price_product_recommended.controller';
import { PriceProductRecommendedService } from './price_product_recommended.service';

describe('PriceProductRecommendedController', () => {
  let controller: PriceProductRecommendedController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PriceProductRecommendedController],
      providers: [PriceProductRecommendedService],
    }).compile();

    controller = module.get<PriceProductRecommendedController>(PriceProductRecommendedController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
