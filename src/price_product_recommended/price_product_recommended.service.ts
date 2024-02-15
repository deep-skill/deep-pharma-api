import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreatePriceProductRecommendedDto } from './dto/create-price_product_recommended.dto';
import { UpdatePriceProductRecommendedDto } from './dto/update-price_product_recommended.dto';
import { PriceProductRecommended } from './entities/price_product_recommended.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PriceProductRecommendedService {

  constructor(
    @InjectRepository( PriceProductRecommended )
    private readonly priceRepository: Repository<PriceProductRecommended>
  ) {}
  async create(createPriceProductRecommendedDto: CreatePriceProductRecommendedDto) {
    try {
      const price = this.priceRepository.create( createPriceProductRecommendedDto );
      await this.priceRepository.save( price );
      return price;
    } catch (error) {
      console.log(error)
      throw new InternalServerErrorException(error)
    }
  }

  async findAll() {
    try {
      const prices = await this.priceRepository.find();
      return prices;
    } catch (error) {
      console.log(error)
      throw new InternalServerErrorException(error)
    }
  }

  async findOne(id: number) {
    try {
      const price = await this.priceRepository.findOne({ where: { id } });
      if (!price) {
        throw new NotFoundException(`Error Get brands by id ${id}`)
      }
      return price;
    } catch (error) {
      console.log(error)
      throw new InternalServerErrorException(error)
    }
  }

  update(id: number, updatePriceProductRecommendedDto: UpdatePriceProductRecommendedDto) {
    return `This action updates a #${id} priceProductRecommended`;
  }

  remove(id: number) {
    return `This action removes a #${id} priceProductRecommended`;
  }
}
