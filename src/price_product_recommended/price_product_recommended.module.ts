import { Module } from '@nestjs/common';
import { PriceProductRecommendedService } from './price_product_recommended.service';
import { PriceProductRecommendedController } from './price_product_recommended.controller';

@Module({
  controllers: [PriceProductRecommendedController],
  providers: [PriceProductRecommendedService],
})
export class PriceProductRecommendedModule {}
