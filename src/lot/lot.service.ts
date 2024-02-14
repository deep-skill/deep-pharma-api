import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateLotDto } from './dto/create-lot.dto';
import { UpdateLotDto } from './dto/update-lot.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Lot } from './entities/lot.entity';
import { Supplier } from 'src/supplier/entities/supplier.entity';
import { Product } from 'src/product/entities/product.entity';

@Injectable()
export class LotService {
  constructor(
    @InjectRepository(Lot)
    private readonly lotRepository: Repository<Lot>,
    @InjectRepository(Supplier)
    private readonly supplierRepository: Repository<Supplier>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>

  ) { }

  async create(createLotDto: CreateLotDto) {
    try {
      const lot = this.lotRepository.create(createLotDto);
      
      const supplier = await this.supplierRepository.findOneBy({
        id: createLotDto.supplier_id
      })

      const product = await this.productRepository.findOneBy({
        id: createLotDto.product_id
      })

      if(!supplier || !product){
        throw new NotFoundException("Error creating lot. None of these entities were found, supplier and product")
      }
      lot.supplier = supplier
      lot.product = product

      await this.lotRepository.save(lot);
      return lot;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(error);
    }
  }

  async findAll() {
    try {
      const lots = await this.lotRepository.find({
        relations: {
          supplier: true,
          product: true
        }
      });
      return lots;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(error);
    }
  }

  async findOne(id: number) {
    try {
      const lot = await this.lotRepository.findOne({ 
        where: { id },
        relations: {
          supplier: true,
          product: true
        }
      });
      if (!lot) {
        throw new NotFoundException(`Error Get lot by id ${id}`);
      }
      return lot;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(error);
    }
  }

  async update(id: number, updateLotDto: UpdateLotDto) {
    try {
      const lot = await this.lotRepository.findOne({ where: { id } });
      if (!lot) {
        throw new NotFoundException(`Error update lot by id ${id}`);
      }
      const supplier = await this.supplierRepository.findOneBy({
        id: updateLotDto.supplier_id
      })

      const product = await this.productRepository.findOneBy({
        id: updateLotDto.product_id
      })

      if(!supplier || !product){
        throw new NotFoundException("Error creating lot. None of these entities were found, supplier and product")
      }
      lot.supplier = supplier
      lot.product = product
      lot.initial_stock = updateLotDto.initial_stock
      lot.updated_stock = updateLotDto.updated_stock
      lot.expiration = updateLotDto.expiration
      lot.lot_state = updateLotDto.lot_state

      return await this.lotRepository.save(lot);
    } catch (error) {
      console.log(error);
      throw new NotFoundException(error);
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
      throw new NotFoundException(error);
    }
  }
}
