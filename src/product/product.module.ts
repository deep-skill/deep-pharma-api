import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { Product } from './entities/product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Drug } from 'src/drug/entities/drug.entity';
import { Presentation } from 'src/presentation/entities/presentation.entity';
import { Brand } from 'src/brand/entities/brand.entity';
import { Type } from 'src/type/entities/type.entity';
import { PriceProductRecommended } from 'src/price_product_recommended/entities/price_product_recommended.entity';

@Module({
  controllers: [ProductController],
  providers: [ProductService, ],
  imports: [
    TypeOrmModule.forFeature([ 
      Product, 
      Drug, 
      Presentation,
      Brand,
      Type,
      PriceProductRecommended
    ]),
  ],
  exports: [
    ProductService,
    TypeOrmModule
  ]
})
export class ProductModule {}
