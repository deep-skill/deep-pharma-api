import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateSaleDto } from './dto/create-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThanOrEqual, Repository } from 'typeorm';
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
        id: createSaleDto.user_id
      });

      const lots = createSaleDto.lots_array.map(async (lot) => {
        
        const getLotId = await this.lotRepository.findOneBy({
          id: lot.lot_id,
          lot_state: true,
          updated_stock: MoreThanOrEqual(lot.quantity)
        });

        if(!getLotId){
          throw new NotFoundException(`Error Get lot by id ${lot.lot_id}`)
        }
        return getLotId
      });

      const getLots = await Promise.all(lots);

      getLots.forEach( async lot => {
        lot.updated_stock  =  lot.updated_stock - createSaleDto.lots_array[getLots.indexOf(lot)].quantity
    
       
        if(lot.updated_stock === 0){
          lot.lot_state = false
        }
        await this.lotRepository.save(lot);
       }) 

      sale.lots = getLots

      await this.saleRepository.save(sale);
      return sale;
    } catch (error) {
      console.log(error)
      throw new InternalServerErrorException(error)
    }
  }

  async findAll() {
    try {
      const sales = await this.saleRepository.find();
      return sales;
    } catch (error) {
      console.log(error)
      throw new InternalServerErrorException(error)
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
      throw new InternalServerErrorException(error)
    }
  }

  async update(id: number, updateSaleDto: UpdateSaleDto) {
    try {
      const sale = await this.saleRepository.findOne({ where: { id } });
      if (!sale) {
        throw new NotFoundException(`Error Get sale by id ${id}`)
      }
      //await this.saleRepository.update(id, updateSaleDto);
      return true;
    } catch (error) {
      console.log(error)
      throw new NotFoundException(error)
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
      throw new NotFoundException(error)
    }
  }
}
