import { IsNumber, IsString, Length } from "class-validator";

export class CreateDrugDto {
    @IsString()
    @Length(3, 100, { message: 'Name must be between 3 and 100 characters' })
    name: string;

    @IsString()
    @Length(3, 100, { message: 'Therapeutic function must be between 3 and 100 characters' })
    therapeutic_function: string;

    @IsString()
    @Length(3, 100, { message: 'Concentracion function must be between 3 and 100 characters' })
    concentration: string;

    @IsNumber()
    created_by: number
}
