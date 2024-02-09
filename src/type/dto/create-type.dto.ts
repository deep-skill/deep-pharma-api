import { IsString, Length } from "class-validator";

export class CreateTypeDto {
    @IsString()
    @Length(3, 20)
    name: string
}
