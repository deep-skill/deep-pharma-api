import { PartialType } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsDateString,
  IsEnum,
  IsInt,
  IsOptional,
} from 'class-validator';
import { InvoiceType } from '@/modules/supply-invoice/entities/supply-invoice.entity';

export class CreateSupplyInvoiceDto {
  @IsNotEmpty()
  @IsEnum(InvoiceType)
  readonly invoiceType: InvoiceType;

  @IsNotEmpty()
  @IsString()
  readonly code: string;

  @IsNotEmpty()
  @IsOptional()
  @IsDateString()
  readonly deliveredAt: Date;

  @IsNotEmpty()
  @IsOptional()
  @IsInt()
  readonly providerId: number;
}

export class UpdateSupplyInvoiceDto extends PartialType(
  CreateSupplyInvoiceDto,
) {}
