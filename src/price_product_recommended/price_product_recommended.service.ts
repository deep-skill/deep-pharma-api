import { Injectable } from '@nestjs/common';
import { CreatePriceProductRecommendedDto } from './dto/create-price_product_recommended.dto';
import { UpdatePriceProductRecommendedDto } from './dto/update-price_product_recommended.dto';

@Injectable()
export class PriceProductRecommendedService {
  create(createPriceProductRecommendedDto: CreatePriceProductRecommendedDto) {
    return 'This action adds a new priceProductRecommended';
  }

  findAll() {
    return `This action returns all priceProductRecommended`;
  }

  findOne(id: number) {
    return `This action returns a #${id} priceProductRecommended`;
  }

  update(id: number, updatePriceProductRecommendedDto: UpdatePriceProductRecommendedDto) {
    return `This action updates a #${id} priceProductRecommended`;
  }

  remove(id: number) {
    return `This action removes a #${id} priceProductRecommended`;
  }
}
