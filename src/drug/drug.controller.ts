import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UsePipes, ValidationPipe, Query } from '@nestjs/common';
import { DrugService } from './drug.service';
import { CreateDrugDto } from './dto/create-drug.dto';
import { UpdateDrugDto } from './dto/update-drug.dto';

@Controller('drug')
export class DrugController {
  constructor(private readonly drugService: DrugService) {}

  @Post()
  create(@Body() createDrugDto: CreateDrugDto) {
    return this.drugService.create(createDrugDto);
  }

  @Get()
  findAll() {
    return this.drugService.findAll();
  }

  @Get('/select-create-product')
  getBySelectProduct(@Query('query') query: string) {
    return this.drugService.getBySelectProduct(query);
  }

  @Get(':id')
  findOne(@Param('id' , ParseIntPipe) id: number) {
    return this.drugService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateDrugDto: UpdateDrugDto) {
    return this.drugService.update(id, updateDrugDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.drugService.remove(id);
  }
}
