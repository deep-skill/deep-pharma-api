import { IsBoolean, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateProductDto {
    @IsString()
    name: string

    @IsNumber()
    barcode: number

    @IsString()
    description: string

    @IsNumber()
    new_price: number

    @IsBoolean()
    prescription_required: boolean

    @IsBoolean()
    is_fractionable: boolean

    @IsNumber()
    created_by: number

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
    category_id: number
}
