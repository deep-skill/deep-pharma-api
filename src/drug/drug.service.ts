import { Injectable, InternalServerErrorException } from '@nestjs/common';
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

  findAll() {
    return `This action returns all drug`;
  }

  findOne(id: number) {
    return `This action returns a #${id} drug`;
  }

  update(id: number, updateDrugDto: UpdateDrugDto) {
    return `This action updates a #${id} drug`;
  }

  remove(id: number) {
    return `This action removes a #${id} drug`;
  }
}
