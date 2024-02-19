import { IsNumber, IsString, Length } from "class-validator";

export class CreateCategoryDto {
    @IsString()
    @Length(3, 20)
    name: string

    @IsNumber()
    created_by: number
}
