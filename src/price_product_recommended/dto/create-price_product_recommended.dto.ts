import { IsDateString, IsNumber, IsOptional } from "class-validator";

export class CreatePriceProductRecommendedDto {
    @IsNumber()
    price: number;

    @IsDateString()
    date_time: Date

    @IsNumber()
    @IsOptional()
    product: number
}
