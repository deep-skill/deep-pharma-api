import { IsEmail, IsNumber, IsString } from "class-validator";

export class CreateUserDto {
  @IsString()
  name: string;
  @IsString()
  last_name: string;
  @IsEmail()
  email: string;
  @IsNumber()
  role_id: number;
}
