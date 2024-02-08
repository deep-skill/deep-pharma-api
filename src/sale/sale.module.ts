import { Module } from '@nestjs/common';
import { SaleService } from './sale.service';
import { SaleController } from './sale.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sale } from './entities/sale.entity';
import { User } from 'src/user/entities/user.entity';

@Module({
  controllers: [SaleController],
  providers: [SaleService],
  imports: [
    TypeOrmModule.forFeature([ Sale, User ]),
  ]
})
export class SaleModule {}
