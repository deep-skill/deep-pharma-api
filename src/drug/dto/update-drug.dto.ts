import { PartialType } from '@nestjs/mapped-types';
import { CreateDrugDto } from './create-drug.dto';
import { IsNumber } from 'class-validator';

export class UpdateDrugDto extends PartialType(CreateDrugDto) {
    @IsNumber()
    updated_by: number
}
