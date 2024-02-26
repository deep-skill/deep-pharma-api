import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
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
      throw new InternalServerErrorException(error)
    }
  }

  async findAll() {
    try {
      const brands = await this.brandRepository.find();
      return brands;
    } catch (error) {
      console.log(error)
      throw new InternalServerErrorException(error)
    }
  }

  async getBySelectProduct() {
    try {
      const categorys = await this.brandRepository.find(
        {
          select: {
            id: true,
            name: true
          }
        }
      );
      return categorys;
    } catch (error) {
      console.log(error)
      throw new InternalServerErrorException(error)
    }
  }

  async findOne(id: number) {
    try {
      const brand = await this.brandRepository.findOne({ where: { id } });
      if (!brand) {
        throw new NotFoundException(`Error Get brands by id ${id}`)
      }
      return brand;
    } catch (error) {
      console.log(error)
      throw new InternalServerErrorException(error)
    }
  }

  async update(id: number, updateBrandDto: UpdateBrandDto) {
    try {
      const brand = await this.brandRepository.findOne({ where: { id } });
      if (!brand) {
        throw new NotFoundException(`Error Get brands by id ${id}`)
      }
      
      await this.brandRepository.update(id, updateBrandDto);
      return true;
    } catch (error) {
      console.log(error)
      throw new NotFoundException(error)
    }
  }

  async remove(id: number) {
    try {
      const brand = await this.brandRepository.findOne({ where: { id } });
      if (!brand) {
        throw new NotFoundException(`Error Get brands by id ${id}`)
      }
      await this.brandRepository.delete(id);
      return true;
    } catch (error) {
      console.log(error)
      throw new NotFoundException(error)
    }
  }
}
