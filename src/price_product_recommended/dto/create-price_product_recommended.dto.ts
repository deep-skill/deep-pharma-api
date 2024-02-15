import { IsDate, IsNumber } from "class-validator";

export class CreatePriceProductRecommendedDto {
    @IsNumber()
    price: number;

    @IsDate()
    date_time: Date
}
