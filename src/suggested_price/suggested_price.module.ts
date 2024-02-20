import { Module } from '@nestjs/common';
import { SuggestedPriceService } from './suggested_price.service';
import { SuggestedPriceController } from './suggested_price.controller';
import { SuggestedPrice } from './entities/suggested_price.entity';
import { Product } from 'src/product/entities/product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [SuggestedPriceController],
  providers: [SuggestedPriceService],
  imports: [
    TypeOrmModule.forFeature([ SuggestedPrice , Product]),
  ],
})
export class SuggestedPriceModule {}
