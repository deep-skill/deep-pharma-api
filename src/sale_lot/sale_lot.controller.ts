import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SaleLotService } from './sale_lot.service';
import { CreateSaleLotDto } from './dto/create-sale_lot.dto';
import { UpdateSaleLotDto } from './dto/update-sale_lot.dto';

@Controller('sale-lot')
export class SaleLotController {
  constructor(private readonly saleLotService: SaleLotService) {}

  @Post()
  create(@Body() createSaleLotDto: CreateSaleLotDto) {
    return this.saleLotService.create(createSaleLotDto);
  }

  @Get()
  findAll() {
    return this.saleLotService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.saleLotService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSaleLotDto: UpdateSaleLotDto) {
    return this.saleLotService.update(+id, updateSaleLotDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.saleLotService.remove(+id);
  }
}
