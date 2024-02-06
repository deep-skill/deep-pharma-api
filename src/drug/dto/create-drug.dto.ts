import { Length } from "class-validator";

export class CreateDrugDto {
    @Length(3, 100, { message: 'Name must be between 3 and 100 characters' })
    name: string;

    @Length(3, 100, { message: 'Therapeutic function must be between 3 and 100 characters' })
    therapeutic_function: string;
}
