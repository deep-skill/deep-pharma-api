import { IsDate, IsNumber, IsString } from "class-validator";

export class CreateSaleDto {
    //@IsDate()
    //date: Date;

    @IsNumber()
    total: number;

    @IsString()
    sale_type:string

}

