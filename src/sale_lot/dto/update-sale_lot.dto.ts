import { PartialType } from '@nestjs/mapped-types';
import { CreateSaleLotDto } from './create-sale_lot.dto';

export class UpdateSaleLotDto extends PartialType(CreateSaleLotDto) {}
