import { IsArray, IsDateString, IsNumber, IsString } from "class-validator";

export class CreateSaleDto {
    @IsDateString()
    sale_date: Date;

    @IsNumber()
    total: number;

    @IsString()
    sale_type: string;

    @IsNumber()
    user_id: number;

    @IsArray()
    lotsArray: lots[]
}

export class lots {

    @IsNumber()
    lot_id: number

    @IsNumber()
    quantity: number
}

