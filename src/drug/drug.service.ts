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
    private readonly drugRepository: Repository<Drug>
  ) {}
  async create(createDrugDto: CreateDrugDto) {
    try {
      const drug = this.drugRepository.create( createDrugDto );
      await this.drugRepository.save( drug );
      return drug;
    } catch (error) {
      console.log(error)
      throw new InternalServerErrorException(error)
    }
  }

  async findAll() {
    try {
      const drugs = await this.drugRepository.find({
        relations: {
          products: true
        }
      });
      return drugs;
    } catch (error) {
      console.log(error)
      throw new InternalServerErrorException(error)
    }
  }

  async getBySelectProduct() {
    try {
      const drugs = await this.drugRepository.find(
        {
          select: {
            id: true,
            name: true
          }
        }
      );
      return drugs;
    } catch (error) {
      console.log(error)
      throw new InternalServerErrorException(error)
    }
  }

  async findOne(id: number) {
    try {
      const drug = await this.drugRepository.findOne({ where: { id } });
      if (!drug) {
        throw new NotFoundException(`Error Get drugs by id ${id}`)
      }
      return drug;
    } catch (error) {
      console.log(error)
      throw new InternalServerErrorException(error)
    }
  }

  async update(id: number, updateDrugDto: UpdateDrugDto) {
    try {
      const drug = await this.drugRepository.findOne({ where: { id } });
      if (!drug) {
        throw new NotFoundException(`Error Get drugs by id ${id}`)
      }
      await this.drugRepository.update(id, updateDrugDto);
      return true;
    } catch (error) {
      console.log(error)
      throw new NotFoundException(error)
    }
  }

  async remove(id: number) {
    try {
      const drug = await this.drugRepository.findOne({ where: { id } });
      if (!drug) {
        throw new NotFoundException(`Error Get drugs by id ${id}`)
      }
      await this.drugRepository.delete(id);
      return true;
    } catch (error) {
      console.log(error)
      throw new NotFoundException(error)
    }
  }
}
