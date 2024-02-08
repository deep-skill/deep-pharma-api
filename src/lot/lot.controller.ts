import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { LotService } from './lot.service';
import { CreateLotDto } from './dto/create-lot.dto';
import { UpdateLotDto } from './dto/update-lot.dto';

@Controller('lot')
export class LotController {
  constructor(private readonly lotService: LotService) {}

  @Post()
  create(@Body() createLotDto: CreateLotDto) {
    return this.lotService.create(createLotDto);
  }

  @Get()
  findAll() {
    return this.lotService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.lotService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id',ParseIntPipe) id: number, @Body() updateLotDto: UpdateLotDto) {
    return this.lotService.update(id, updateLotDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.lotService.remove(id);
  }
}
