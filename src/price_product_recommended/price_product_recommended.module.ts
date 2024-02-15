import { Module } from '@nestjs/common';
import { PriceProductRecommendedService } from './price_product_recommended.service';
import { PriceProductRecommendedController } from './price_product_recommended.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PriceProductRecommended } from './entities/price_product_recommended.entity';
import { Product } from 'src/product/entities/product.entity';

@Module({
  controllers: [PriceProductRecommendedController],
  providers: [PriceProductRecommendedService],
  imports: [
    TypeOrmModule.forFeature([ PriceProductRecommended , Product]),
  ],
})
export class PriceProductRecommendedModule {}
