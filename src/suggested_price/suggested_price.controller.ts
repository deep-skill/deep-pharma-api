import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { SuggestedPriceService } from './suggested_price.service';
import { CreateSuggestedPriceDto } from './dto/create-suggested_price.dto';
import { UpdateSuggestedPriceDto } from './dto/update-suggested_price.dto';

@Controller('suggested-price')
export class SuggestedPriceController {
  constructor(private readonly suggestedPriceService: SuggestedPriceService) {}

  @Post()
  create(@Body() createSuggestedPriceDto: CreateSuggestedPriceDto) {
    return this.suggestedPriceService.create(createSuggestedPriceDto);
  }

  @Get()
  findAll() {
    return this.suggestedPriceService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.suggestedPriceService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateSuggestedPriceDto: UpdateSuggestedPriceDto) {
    return this.suggestedPriceService.update(+id, updateSuggestedPriceDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.suggestedPriceService.remove(+id);
  }
}
