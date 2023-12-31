import { Module } from '@nestjs/common';
import { DrugstoreService } from './drugstore.service';
import { DrugstoreController } from './drugstore.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Drugstore } from '@/modules/drugstore/entities/drugstore.entity';

@Module({
  imports: [SequelizeModule.forFeature([Drugstore])],
  controllers: [DrugstoreController],
  providers: [DrugstoreService],
  exports: [DrugstoreService],
})
export class DrugstoreModule {}
