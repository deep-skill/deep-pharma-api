import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateSaleLotDto } from './dto/create-sale_lot.dto';
import { UpdateSaleLotDto } from './dto/update-sale_lot.dto';
import { Lot } from 'src/lot/entities/lot.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThanOrEqual, Repository } from 'typeorm';
import { Sale } from 'src/sale/entities/sale.entity';
import { SaleLot } from './entity/sale_lot.entity';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class SaleLotService {

  constructor(

    @InjectRepository(SaleLot)
    private readonly saleLotRepository: Repository<SaleLot>,

    @InjectRepository(Lot)
    private readonly lotRepository: Repository<Lot>,

    @InjectRepository(Sale)
    private readonly saleRepository: Repository<Sale>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  async create(createSaleLotDto: CreateSaleLotDto) {
    try {
      
      const sale = this.saleRepository.create(createSaleLotDto.sale);
      const user = await this.userRepository.findOneBy({
        id: createSaleLotDto.sale.user_id
      });
      if(!user) {
        throw new NotFoundException(`Error Get user by id ${createSaleLotDto.sale.user_id}`)
      }
      
      const lots = createSaleLotDto.array_lot.map(async (lot) => {
        
        const getLotId = await this.lotRepository.findOneBy({
          id: lot.id,
          lot_state: true,
          updated_stock: MoreThanOrEqual(lot.stock_quantity)
        });

        if(!getLotId){
          throw new NotFoundException(`Error Get lot by id ${lot.id}`)
        }
        return getLotId
      });
      
      const getLots = await Promise.all(lots);
      getLots.forEach( async lot => {
        lot.updated_stock  =  lot.updated_stock - createSaleLotDto.array_lot[getLots.indexOf(lot)].stock_quantity
        const saleLot = this.saleLotRepository.create({
          price: createSaleLotDto.sale_price,
          quantity: createSaleLotDto.array_lot[getLots.indexOf(lot)].stock_quantity,
          lot: lot,
          sale: sale
        })
        if(lot.updated_stock === 0){
          lot.lot_state = false
        }
        await this.saleRepository.save(sale);
        saleLot.sale = sale

        await this.lotRepository.save(lot);
        await this.saleLotRepository.save(saleLot);
      
       }) 
       return {
        sale,
        getLots,
       }
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(error);
    }
  }

   async findAll() {
    try {
      const salesLot = await this.saleLotRepository.find(
        {
          relations: {
            lot: true,
            sale: true
          }
        }
      );
      return salesLot;
    } catch (error) {
      console.log(error)
      throw new InternalServerErrorException(error)
    }
  }

  findOne(id: number) {
    try {
      const saleLot = this.saleLotRepository.findOne({ 
        where: { id },
        relations: {
          lot: true,
          sale: true
        }
       });
      if (!saleLot) {
        throw new NotFoundException(`Error Get saleLot by id ${id}`)
      }
      return saleLot;
      
    } catch (error) {
      console.log(error)
      throw new InternalServerErrorException(error)
    }
  }

  update(id: number, updateSaleLotDto: UpdateSaleLotDto) {
    return `This action updates a #${id} saleLot`;
  }

  remove(id: number) {
    return `This action removes a #${id} saleLot`;
  }
}
