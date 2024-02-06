import { Module } from '@nestjs/common';
import { PresentationService } from './presentation.service';
import { PresentationController } from './presentation.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Presentation } from './entities/presentation.entity';


@Module({
  controllers: [PresentationController],
  providers: [PresentationService],
  imports: [
    TypeOrmModule.forFeature([ Presentation]),
  ]
})
export class PresentationModule {}
