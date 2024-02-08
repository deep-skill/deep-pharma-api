import {
  IsNumberString,
  IsString,
  MaxLength,
  MinLength,
} from "class-validator";

export class CreateCustomerDto {
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  name: string;

  @IsNumberString()
  @MinLength(6)
  @MaxLength(11)
  phone_number: number;
}
