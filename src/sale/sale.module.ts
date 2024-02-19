import { Module } from '@nestjs/common';
import { SaleService } from './sale.service';
import { SaleController } from './sale.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sale } from './entities/sale.entity';
import { User } from 'src/user/entities/user.entity';
import { Lot } from 'src/lot/entities/lot.entity';
import { SaleLot } from 'src/sale_lot/entity/sale_lot.entity';

@Module({
  controllers: [SaleController],
  providers: [SaleService],
  imports: [
    TypeOrmModule.forFeature([Sale, User, Lot, SaleLot]),
  ]
})
export class SaleModule { }
