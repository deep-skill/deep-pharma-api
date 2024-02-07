import { Module } from '@nestjs/common';
import { LotService } from './lot.service';
import { LotController } from './lot.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lot } from './entities/lot.entity';
import { SupplierModule } from 'src/supplier/supplier.module';
import { Supplier } from 'src/supplier/entities/supplier.entity';

@Module({
  controllers: [LotController],
  providers: [LotService],
  imports: [
    TypeOrmModule.forFeature([Lot, Supplier]),
  ],
  exports: [
    TypeOrmModule,
    LotService
  ],

})
export class LotModule { }
