import { Module } from '@nestjs/common';
import { LotService } from './lot.service';
import { LotController } from './lot.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lot } from './entities/lot.entity';
import { Supplier } from 'src/supplier/entities/supplier.entity';
import { Product } from 'src/product/entities/product.entity';
import { SaleLot } from 'src/sale_lot/entity/sale_lot.entity';

@Module({
  controllers: [LotController],
  providers: [LotService],
  imports: [
    TypeOrmModule.forFeature([Lot, Supplier, Product, SaleLot]),
  ],
})
export class LotModule { }
