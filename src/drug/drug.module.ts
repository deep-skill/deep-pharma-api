import { Module } from '@nestjs/common';
import { DrugService } from './drug.service';
import { DrugController } from './drug.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Drug } from './entities/drug.entity';

@Module({
  controllers: [DrugController],
  providers: [DrugService],
  imports: [
    TypeOrmModule.forFeature([ Drug ]),
  ],

})
export class DrugModule {}
