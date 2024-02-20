import { IsDateString, IsNumber, IsOptional } from "class-validator";

export class CreateSuggestedPriceDto {
    @IsNumber()
    price: number;

    @IsDateString()
    date_time: Date

    @IsNumber()
    created_by: number

    @IsNumber()
    @IsOptional()
    product: number
}
