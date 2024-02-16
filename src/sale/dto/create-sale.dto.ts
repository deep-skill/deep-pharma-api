import { IsArray, IsDateString, IsNumber, IsString } from "class-validator";

export class CreateSaleDto {
    @IsDateString()
    sale_date: Date;

    @IsNumber()
    total: number;

    @IsNumber()
    created_by: number

    @IsString()
    sale_type: string;

    @IsNumber()
    user_id: number;

    @IsArray()
    lots_array: lots[]
}

export class lots {

    @IsNumber()
    lot_id: number

    @IsNumber()
    quantity: number
}

