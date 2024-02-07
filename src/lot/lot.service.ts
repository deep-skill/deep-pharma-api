import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateLotDto } from './dto/create-lot.dto';
import { UpdateLotDto } from './dto/update-lot.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Lot } from './entities/lot.entity';
import { Supplier } from 'src/supplier/entities/supplier.entity';

@Injectable()
export class LotService {
  constructor(
    @InjectRepository(Lot)
    private readonly lotRepository: Repository<Lot>,
    @InjectRepository(Supplier)
    private readonly supplierRepository: Repository<Supplier>
  ) { }

  async create(createLotDto: CreateLotDto) {
    try {
      const lot = this.lotRepository.create(createLotDto);
      lot.supplier = await this.supplierRepository.findOneBy({
        id: createLotDto.supplierId
      })

      await this.lotRepository.save(lot);
      return lot;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException("Error creating brand");
    }
  }

  async findAll() {
    try {
      const lots = await this.lotRepository.find({
        relations: {
          supplier: true
        }
      });
      return lots;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException("Error Get all lots");
    }
  }

  async findOne(id: number) {
    try {
      const lot = await this.lotRepository.findOne({ where: { id } });
      if (!lot) {
        throw new NotFoundException(`Error Get lot by id ${id}`);
      }
      return lot;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException("Error getting lot");
    }
  }

  async update(id: number, updateLotDto: UpdateLotDto) {
    try {
      const lot = await this.lotRepository.findOne({ where: { id } });
      if (!lot) {
        throw new NotFoundException(`Error update lot by id ${id}`);
      }
      await this.lotRepository.update(id, updateLotDto);
      return true;
    } catch (error) {
      console.log(error);
      throw new NotFoundException(`Error update lot by id ${id}`);
    }
  }

  async remove(id: number) {
    try {
      const lot = await this.lotRepository.findOne({ where: { id } });
      if (!lot) {
        throw new NotFoundException(`Error remove lot by id ${id}`);
      }
      await this.lotRepository.delete(id);
      return true;
    } catch (error) {
      console.log(error);
      throw new NotFoundException(`Error remove lot by id ${id}`);
    }
  }
}
