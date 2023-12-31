import { Module } from '@nestjs/common';
import { ConcentrationUnitService } from './concentration-unit.service';
import { ConcentrationUnitController } from './concentration-unit.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConcentrationUnit } from '@/modules/concentration-unit/entities/concentration-unit.entity';

@Module({
  imports: [SequelizeModule.forFeature([ConcentrationUnit])],
  controllers: [ConcentrationUnitController],
  providers: [ConcentrationUnitService],
  exports: [ConcentrationUnitService],
})
export class ConcentrationUnitModule {}
