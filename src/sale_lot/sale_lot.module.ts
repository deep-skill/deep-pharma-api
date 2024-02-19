import { Module } from '@nestjs/common';
import { SaleLotService } from './sale_lot.service';
import { SaleLotController } from './sale_lot.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SaleLot } from './entity/sale_lot.entity';
import { Lot } from 'src/lot/entities/lot.entity';
import { Sale } from 'src/sale/entities/sale.entity';
import { User } from 'src/user/entities/user.entity';

@Module({
  controllers: [SaleLotController],
  providers: [SaleLotService],
  imports: [
    TypeOrmModule.forFeature([ SaleLot , Lot, Sale, User]),
  ]
})
export class SaleLotModule {}
