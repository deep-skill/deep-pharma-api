import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Brand } from './entities/brand.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BrandService {

  constructor(
    @InjectRepository( Brand )
    private readonly brandRepository: Repository<Brand>
  ) {}
  async create(createBrandDto: CreateBrandDto) {
    try {
      const brand = this.brandRepository.create( createBrandDto );
      await this.brandRepository.save( brand );
      return brand;
    } catch (error) {
      console.log(error)
      throw new InternalServerErrorException('Error creating brand')
    }
  }

  findAll() {
    return `This action returns all brand`;
  }

  findOne(id: number) {
    return `This action returns a #${id} brand`;
  }

  update(id: number, updateBrandDto: UpdateBrandDto) {
    return `This action updates a #${id} brand`;
  }

  remove(id: number) {
    return `This action removes a #${id} brand`;
  }
}
