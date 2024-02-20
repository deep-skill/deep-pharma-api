import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { Product } from './entities/product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Drug } from 'src/drug/entities/drug.entity';
import { Presentation } from 'src/presentation/entities/presentation.entity';
import { Brand } from 'src/brand/entities/brand.entity';
import { Category } from 'src/category/entities/category.entity';
import { SuggestedPrice } from 'src/suggested_price/entities/suggested_price.entity';

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
      SuggestedPrice
    ]),
  ],
  exports: [
    ProductService,
    TypeOrmModule
  ]
})
export class ProductModule {}
