import { PartialType } from '@nestjs/mapped-types';
import { CreateLotDto } from './create-lot.dto';
import { IsNumber } from 'class-validator';

export class UpdateLotDto extends PartialType(CreateLotDto) {
    @IsNumber()
    updated_by: number
}
