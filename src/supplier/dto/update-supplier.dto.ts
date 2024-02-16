import { PartialType } from '@nestjs/mapped-types';
import { CreateSupplierDto } from './create-supplier.dto';
import { IsNumber } from 'class-validator';

export class UpdateSupplierDto extends PartialType(CreateSupplierDto) {
    @IsNumber()
    updated_by: number
}
