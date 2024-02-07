import { IsNumber, IsString } from "class-validator";

export class CreateUserDto {
  @IsString()
  name: string;
  @IsString()
  lastName: string;
  @IsNumber()
  dni: number;
  @IsString()
  password: string;
  @IsNumber()
  roleId: number;
}
