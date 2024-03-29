import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { BrandService } from './brand.service';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';

//import { AuthorizationGuard } from 'src/authorization/authorization.guard';
//import { PermissionsGuard } from 'src/authorization/permissions.guard';

//@UseGuards(AuthorizationGuard)

@Controller('brand')
export class BrandController {
  constructor(private readonly brandService: BrandService) {}

  //@UseGuards(PermissionsGuard)
  //@SetMetadata('permissions', ['pepe'])
  @Post()
  create(@Body() createBrandDto: CreateBrandDto) {
    return this.brandService.create(createBrandDto);
  }

  @Get()
  findAll() {
    return this.brandService.findAll();
  }

  @Get('/select-create-product')
  getBySelectProduct() {
    return this.brandService.getBySelectProduct();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.brandService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateBrandDto: UpdateBrandDto) {
    return this.brandService.update(id, updateBrandDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.brandService.remove(id);
  }
}
