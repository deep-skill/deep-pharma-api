import { IsString } from "class-validator";

export class CreateLaboratoryDto {
  @IsString()
  name: string;
}
