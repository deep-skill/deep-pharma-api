import { IsBoolean, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateProductDto {
    @IsString()
    name: string

    @IsString()
    description: string

    @IsNumber()
    price: number

    @IsBoolean()
    prescription_required: boolean

    @IsBoolean()
    is_fractionable: boolean

    @IsNumber()
    @IsOptional()
    drug_id: number

    @IsNumber()
    @IsOptional()
    presentation_id: number

    @IsNumber()
    @IsOptional()
    brand_id: number

    @IsNumber()
    @IsOptional()
    type_id: number
}
