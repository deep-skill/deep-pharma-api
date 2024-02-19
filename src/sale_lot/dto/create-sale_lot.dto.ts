import { IsArray, IsNumber, IsObject } from "class-validator";
import { ClassGlobal } from "src/class_global/class_global.entity";
import { CreateSaleDto } from "src/sale/dto/create-sale.dto";

export class CreateSaleLotDto extends ClassGlobal{
    @IsNumber()
    created_by: number;

    @IsNumber()
    sale_price: number

    @IsNumber()
    quantity: number

    @IsObject()
    sale: CreateSaleDto

    @IsArray()
    array_lot: lots[]
}

export class lots {

    @IsNumber()
    id: number

    @IsNumber()
    stock_quantity: number
}