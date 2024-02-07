import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { Product } from './entities/product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DrugModule } from 'src/drug/drug.module';
import { Drug } from 'src/drug/entities/drug.entity';
import { Laboratory } from 'src/laboratory/entities/laboratory.entity';

@Module({
  controllers: [ProductController],
  providers: [ProductService, ],
  imports: [
    TypeOrmModule.forFeature([ Product , Drug, Laboratory]),
  ],
  exports: [
    ProductService,
    TypeOrmModule
  ]
})
export class ProductModule {}
