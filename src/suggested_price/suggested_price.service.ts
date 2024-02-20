import { Injectable } from '@nestjs/common';
import { CreateSuggestedPriceDto } from './dto/create-suggested_price.dto';
import { UpdateSuggestedPriceDto } from './dto/update-suggested_price.dto';

@Injectable()
export class SuggestedPriceService {
  create(createSuggestedPriceDto: CreateSuggestedPriceDto) {
    return 'This action adds a new suggestedPrice';
  }

  findAll() {
    return `This action returns all suggestedPrice`;
  }

  findOne(id: number) {
    return `This action returns a #${id} suggestedPrice`;
  }

  update(id: number, updateSuggestedPriceDto: UpdateSuggestedPriceDto) {
    return `This action updates a #${id} suggestedPrice`;
  }

  remove(id: number) {
    return `This action removes a #${id} suggestedPrice`;
  }
}
