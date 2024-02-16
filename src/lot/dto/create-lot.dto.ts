import { IsBoolean, IsDateString, IsNumber } from "class-validator";

export class CreateLotDto {
    @IsNumber()
    initial_stock: number;

    @IsNumber()
    updated_stock: number;
    
    @IsDateString()
    expiration: Date;

    @IsBoolean()
    lot_state: boolean;

    @IsNumber()
    cost_price: number;

    @IsNumber()
    created_by: number

    @IsNumber()
    supplier_id: number;

    @IsNumber()
    product_id: number;
}