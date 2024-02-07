import { Injectable, InternalServerErrorException } from '@nestjs/common';
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

  findAll() {
    return this.lotRepository.find(
      {
        relations: {
          supplier: true
        }
      }
    );
  }

  findOne(id: number) {
    return `This action returns a #${id} lot`;
  }

  update(id: number, updateLotDto: UpdateLotDto) {
    return `This action updates a #${id} lot`;
  }

  remove(id: number) {
    return `This action removes a #${id} lot`;
  }
}
