import { Test, TestingModule } from '@nestjs/testing';
import { SuggestedPriceController } from './suggested_price.controller';
import { SuggestedPriceService } from './suggested_price.service';

describe('SuggestedPriceController', () => {
  let controller: SuggestedPriceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SuggestedPriceController],
      providers: [SuggestedPriceService],
    }).compile();

    controller = module.get<SuggestedPriceController>(SuggestedPriceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
