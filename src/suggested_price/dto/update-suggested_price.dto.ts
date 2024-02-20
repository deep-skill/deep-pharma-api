import { PartialType } from '@nestjs/mapped-types';
import { CreateSuggestedPriceDto } from './create-suggested_price.dto';
import { IsNumber } from 'class-validator';

export class UpdateSuggestedPriceDto extends PartialType(CreateSuggestedPriceDto) {
    @IsNumber()
    updated_by: number
}
