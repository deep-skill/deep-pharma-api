import { PartialType } from '@nestjs/mapped-types';
import { CreateBrandDto } from './create-brand.dto';
import { IsNumber } from 'class-validator';

export class UpdateBrandDto extends PartialType(CreateBrandDto) {
    @IsNumber()
    updated_by: number
}
