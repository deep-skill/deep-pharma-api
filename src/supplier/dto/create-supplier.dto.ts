import { IsEmail, IsNumberString, IsString, MaxLength, MinLength } from "class-validator";

export class CreateSupplierDto {
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  name: string;
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  address: string;
  @IsNumberString()
  @MinLength(6)
  @MaxLength(11)
  phone_number: number;
  @IsEmail()
  email: string;
}
