import { IsNumber, IsString, Length } from "class-validator";

export class CreatePresentationDto {
    @IsString()
    @Length(3, 100, { message: 'Name must be between 3 and 100 characters' })
    name: string;

    @IsNumber()
    factor: number;

}
