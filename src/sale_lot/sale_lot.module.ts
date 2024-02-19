import { Module } from '@nestjs/common';
import { SaleLotService } from './sale_lot.service';
import { SaleLotController } from './sale_lot.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SaleLot } from './entity/sale_lot.entity';

@Module({
  controllers: [SaleLotController],
  providers: [SaleLotService],
  imports: [
    TypeOrmModule.forFeature([ SaleLot ]),
  ]
})
export class SaleLotModule {}
