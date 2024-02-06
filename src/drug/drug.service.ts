import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateDrugDto } from './dto/create-drug.dto';
import { UpdateDrugDto } from './dto/update-drug.dto';
import { Drug } from './entities/drug.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class DrugService {

  constructor(
    @InjectRepository( Drug )
    private readonly drogRepository: Repository<Drug>
  ) {}
  async create(createDrugDto: CreateDrugDto) {
    try {
      const brand = this.drogRepository.create( createDrugDto );
      await this.drogRepository.save( brand );
      return brand;
    } catch (error) {
      console.log(error)
      throw new InternalServerErrorException('Error creating brand')
    }
  }

  async findAll() {
    try {
      const brands = await this.drogRepository.find();
      return brands;
    } catch (error) {
      console.log(error)
      throw new InternalServerErrorException('Error Get all  drugs')
    }
  }

  async findOne(id: number) {
    try {
      const brand = await this.drogRepository.findOne({ where: { id } });
      if (!brand) {
        throw new NotFoundException(`Error Get drugs by id ${id}`)
      }
      return brand;
    } catch (error) {
      console.log(error)
      throw new InternalServerErrorException('Error creating brand')
    }
  }

  async update(id: number, updateDrugDto: UpdateDrugDto) {
    try {
      const brand = await this.drogRepository.findOne({ where: { id } });
      if (!brand) {
        throw new NotFoundException(`Error Get drugs by id ${id}`)
      }
      await this.drogRepository.update(id, updateDrugDto);
      return true;
    } catch (error) {
      console.log(error)
      throw new NotFoundException(`Error Get drugs by id ${id}`)
    }
  }

  async remove(id: number) {
    try {
      const brand = await this.drogRepository.findOne({ where: { id } });
      if (!brand) {
        throw new NotFoundException(`Error Get drugs by id ${id}`)
      }
      await this.drogRepository.delete(id);
      return true;
    } catch (error) {
      console.log(error)
      throw new NotFoundException(`Error Get drugs by id ${id}`)
    }
  }
}
