import { IsNumber, IsString } from "class-validator";

export class CreateRoleDto {
    @IsString()
    name: string

    @IsNumber()
    created_by: number
}
