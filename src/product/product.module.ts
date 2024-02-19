import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { Product } from './entities/product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Drug } from 'src/drug/entities/drug.entity';
import { Presentation } from 'src/presentation/entities/presentation.entity';
import { Brand } from 'src/brand/entities/brand.entity';
import { PriceProductRecommended } from 'src/price_product_recommended/entities/price_product_recommended.entity';
import { Category } from 'src/category/entities/category.entity';

@Module({
  controllers: [ProductController],
  providers: [ProductService, ],
  imports: [
    TypeOrmModule.forFeature([ 
      Product, 
      Drug, 
      Presentation,
      Brand,
      Category,
      PriceProductRecommended
    ]),
  ],
  exports: [
    ProductService,
    TypeOrmModule
  ]
})
export class ProductModule {}
