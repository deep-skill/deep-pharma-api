import { IsBoolean, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateProductDto {
    @IsString()
    name: string

    @IsString()
    description: string

    @IsString()
    @IsOptional()
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
    @IsOptional()
    drugId: number

    @IsNumber()
    @IsOptional()
    laboratoryId: number

    @IsNumber()
    @IsOptional()
    presentationId: number

    @IsNumber()
    @IsOptional()
    brandId: number
}
