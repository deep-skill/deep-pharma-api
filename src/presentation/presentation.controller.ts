import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Query } from '@nestjs/common';
import { PresentationService } from './presentation.service';
import { CreatePresentationDto } from './dto/create-presentation.dto';
import { UpdatePresentationDto } from './dto/update-presentation.dto';



@Controller('presentation')
export class PresentationController {
  constructor(private readonly presentationService: PresentationService) {}

  @Post()
  create(@Body() createPresentationDto: CreatePresentationDto) {
    return this.presentationService.create(createPresentationDto);
  }

  @Get()
  findAll() {
    return this.presentationService.findAll();
  }

  @Get('search')
  searchByQuery(@Query('query') query: string) {
    return this.presentationService.searchByQuery({query});
  }

  @Get('/select-create-product')
  getBySelectProduct(@Query('query') query: string) {
    return this.presentationService.getBySelectProduct(query);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.presentationService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updatePresentationDto: UpdatePresentationDto) {
    return this.presentationService.update(id, updatePresentationDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.presentationService.remove(+id);
  }
}
