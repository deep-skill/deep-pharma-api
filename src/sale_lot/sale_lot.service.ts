import { Injectable } from '@nestjs/common';
import { CreateSaleLotDto } from './dto/create-sale_lot.dto';
import { UpdateSaleLotDto } from './dto/update-sale_lot.dto';

@Injectable()
export class SaleLotService {
  create(createSaleLotDto: CreateSaleLotDto) {
    return 'This action adds a new saleLot';
  }

  findAll() {
    return `This action returns all saleLot`;
  }

  findOne(id: number) {
    return `This action returns a #${id} saleLot`;
  }

  update(id: number, updateSaleLotDto: UpdateSaleLotDto) {
    return `This action updates a #${id} saleLot`;
  }

  remove(id: number) {
    return `This action removes a #${id} saleLot`;
  }
}
