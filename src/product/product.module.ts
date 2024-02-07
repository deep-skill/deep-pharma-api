import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { Product } from './entities/product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DrugModule } from 'src/drug/drug.module';
import { Drug } from 'src/drug/entities/drug.entity';

@Module({
  controllers: [ProductController],
  providers: [ProductService, ],
  imports: [
    TypeOrmModule.forFeature([ Product , Drug]),
  ],
  exports: [
    ProductService,
    TypeOrmModule
  ]
})
export class ProductModule {}
