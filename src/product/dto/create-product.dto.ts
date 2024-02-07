import { IsBoolean, IsNumber, IsString } from "class-validator";

export class CreateProductDto {
    @IsString()
    name: string

    @IsString()
    description: string

    @IsString()
    additional_info: string

    @IsNumber()
    price: number

    @IsBoolean()
    prescription_required: boolean

    @IsBoolean()
    is_medicine: boolean

    @IsBoolean()
    is_fractionable: boolean

    @IsNumber()
    drugId: number
}
