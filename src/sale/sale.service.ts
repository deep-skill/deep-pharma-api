import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateSaleDto } from './dto/create-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sale } from './entities/sale.entity';
import { User } from 'src/user/entities/user.entity';
import { Lot } from 'src/lot/entities/lot.entity';

@Injectable()
export class SaleService {

  constructor(
    @InjectRepository(Sale)
    private readonly saleRepository: Repository<Sale>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Lot)
    private readonly lotRepository: Repository<Lot>
  ) { }
  async create(createSaleDto: CreateSaleDto) {
    try {
      const sale = this.saleRepository.create(createSaleDto);
      sale.user = await this.userRepository.findOneBy({
        id: createSaleDto.userId
      });

      const lots = createSaleDto.lotsId.map(async (lotId) => {
        return await this.lotRepository.findOneBy({
          id: lotId
        });
      });
      sale.lots = await Promise.all(lots);

      await this.saleRepository.save(sale);
      return sale;
    } catch (error) {
      console.log(error)
      throw new InternalServerErrorException('Error creating sale')
    }
  }

  async findAll() {
    try {
      const sales = await this.saleRepository.find();
      return sales;
    } catch (error) {
      console.log(error)
      throw new InternalServerErrorException('Error Get all sale')
    }
  }

  async findOne(id: number) {
    try {
      const sale = await this.saleRepository.findOne({ where: { id } });
      if (!sale) {
        throw new NotFoundException(`Error Get sales by id ${id}`)
      }
      return sale;
    } catch (error) {
      console.log(error)
      throw new InternalServerErrorException('Error Get sale')
    }
  }

  async update(id: number, updateSaleDto: UpdateSaleDto) {
    try {
      const sale = await this.saleRepository.findOne({ where: { id } });
      if (!sale) {
        throw new NotFoundException(`Error Get sale by id ${id}`)
      }
      await this.saleRepository.update(id, updateSaleDto);
      return true;
    } catch (error) {
      console.log(error)
      throw new NotFoundException(`Error Get sale by id ${id}`)
    }
  }

  async remove(id: number) {
    try {
      const sale = await this.saleRepository.findOne({ where: { id } });
      if (!sale) {
        throw new NotFoundException(`Error Get sales by id ${id}`)
      }
      await this.saleRepository.delete(id);
      return true;
    } catch (error) {
      console.log(error)
      throw new NotFoundException(`Error Get sale by id ${id}`)
    }
  }
}
