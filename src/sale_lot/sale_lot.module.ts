import { Module } from '@nestjs/common';
import { SaleLotService } from './sale_lot.service';
import { SaleLotController } from './sale_lot.controller';

@Module({
  controllers: [SaleLotController],
  providers: [SaleLotService],
})
export class SaleLotModule {}
