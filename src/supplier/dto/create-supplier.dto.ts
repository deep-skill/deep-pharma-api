import { IsNumber, IsString } from "class-validator";

export class CreateSupplierDto {
  @IsString()
  name: string;
  @IsString()
  address: string;
  @IsNumber()
  phone_number: number;
  @IsString()
  email: string;
}
