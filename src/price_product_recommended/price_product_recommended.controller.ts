import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PriceProductRecommendedService } from './price_product_recommended.service';
import { CreatePriceProductRecommendedDto } from './dto/create-price_product_recommended.dto';
import { UpdatePriceProductRecommendedDto } from './dto/update-price_product_recommended.dto';

@Controller('price-product-recommended')
export class PriceProductRecommendedController {
  constructor(private readonly priceProductRecommendedService: PriceProductRecommendedService) {}

  @Post()
  create(@Body() createPriceProductRecommendedDto: CreatePriceProductRecommendedDto) {
    return this.priceProductRecommendedService.create(createPriceProductRecommendedDto);
  }

  @Get()
  findAll() {
    return this.priceProductRecommendedService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.priceProductRecommendedService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePriceProductRecommendedDto: UpdatePriceProductRecommendedDto) {
    return this.priceProductRecommendedService.update(+id, updatePriceProductRecommendedDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.priceProductRecommendedService.remove(+id);
  }
}
