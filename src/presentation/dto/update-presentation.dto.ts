import { PartialType } from '@nestjs/mapped-types';
import { CreatePresentationDto } from './create-presentation.dto';
import { IsNumber } from 'class-validator';

export class UpdatePresentationDto extends PartialType(CreatePresentationDto) {
    @IsNumber()
    updated_by: number
}
