import { IsNumber, IsString } from "class-validator";

export class CreateSupplierDto {
  @IsString()
  name: string;
  @IsString()
  address: string;
  @IsNumber()
  phone: number;
  @IsString()
  email: string;
}
