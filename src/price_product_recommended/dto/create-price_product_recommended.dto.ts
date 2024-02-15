import { IsDateString, IsNumber } from "class-validator";

export class CreatePriceProductRecommendedDto {
    @IsNumber()
    price: number;

    @IsDateString()
    date_time: Date
}
