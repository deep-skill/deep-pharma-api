import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateSuggestedPriceDto } from './dto/create-suggested_price.dto';
import { UpdateSuggestedPriceDto } from './dto/update-suggested_price.dto';
import { SuggestedPrice } from './entities/suggested_price.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class SuggestedPriceService {

  constructor(
    @InjectRepository( SuggestedPrice )
    private readonly priceRepository: Repository<SuggestedPrice>
  ) {}

  async create(createSuggestedPriceDto: CreateSuggestedPriceDto) {
    try {
      const price = this.priceRepository.create( createSuggestedPriceDto );
      await this.priceRepository.save( price );
      return price;
    } catch (error) {
      console.log(error)
      throw new InternalServerErrorException(error)
    }
  }

  async findAll() {
    try {
      const prices = await this.priceRepository.find(
        {
          relations: {
            products: true
          }
        }
      );
      return prices;
    } catch (error) {
      console.log(error)
      throw new InternalServerErrorException(error)
    }
  }

  async findOne(id: number) {
    try {
      const price = await this.priceRepository.findOne({ 
        where: { id },
        relations: {
          products: true
        }
      });
      if (!price) {
        throw new NotFoundException(`Error Get brands by id ${id}`)
      }
      return price;
    } catch (error) {
      console.log(error)
      throw new InternalServerErrorException(error)
    }
  }

  update(id: number, updateSuggestedPriceDto: UpdateSuggestedPriceDto) {
    return `This action updates a #${id} suggestedPrice`;
  }

  remove(id: number) {
    return `This action removes a #${id} suggestedPrice`;
  }
}
