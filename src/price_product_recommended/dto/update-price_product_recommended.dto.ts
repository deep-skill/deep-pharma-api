import { PartialType } from '@nestjs/mapped-types';
import { CreatePriceProductRecommendedDto } from './create-price_product_recommended.dto';

export class UpdatePriceProductRecommendedDto extends PartialType(CreatePriceProductRecommendedDto) {}
