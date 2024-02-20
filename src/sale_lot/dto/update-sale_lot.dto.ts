import { PartialType } from '@nestjs/mapped-types';
import { CreateSaleLotDto } from './create-sale_lot.dto';
import { IsNumber } from 'class-validator';

export class UpdateSaleLotDto extends PartialType(CreateSaleLotDto) {
    @IsNumber()
    updated_by?: number;
}
