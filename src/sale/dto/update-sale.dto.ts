import { PartialType } from '@nestjs/mapped-types';
import { CreateSaleDto } from './create-sale.dto';
import { IsNumber } from 'class-validator';

export class UpdateSaleDto extends PartialType(CreateSaleDto) {
    @IsNumber()
    updated_by: number
}
