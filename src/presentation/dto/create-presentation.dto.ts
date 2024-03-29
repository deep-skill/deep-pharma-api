import { IsNumber, IsString, Length } from "class-validator";

export class CreatePresentationDto {
    @IsString()
    @Length(3, 100, { message: 'Name must be between 3 and 100 characters' })
    name: string;

    @IsNumber()
    quantity: number;

    @IsNumber()
    created_by: number

}
