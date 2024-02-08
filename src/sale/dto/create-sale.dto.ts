import { IsArray, IsDateString, IsNumber, IsString } from "class-validator";

export class CreateSaleDto {
    @IsDateString()
    sale_date: Date;

    @IsNumber()
    total: number;

    @IsString()
    sale_type: string;

    @IsNumber()
    userId: number;

    @IsArray()
    lotsId: number[]
}

