import { IsArray, IsNumber, IsString, Length } from "class-validator";

export class CreateDrugDto {
    @IsString()
    @Length(3, 100, { message: 'Name must be between 3 and 100 characters' })
    name: string;

    @IsString()
    @Length(3, 100, { message: 'Therapeutic function must be between 3 and 100 characters' })
    therapeutic_function: string;

}
