import {
  Controller,
  ParseIntPipe,
  Param,
  Query,
  Body,
  Get,
  Post,
  Put,
  Delete,
  UseGuards,
  SetMetadata
} from '@nestjs/common';
import { BrandService } from './brand.service';
import { CreateBrandDto, UpdateBrandDto } from './dto/brand.dto';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { Brand } from './entities/brand.entity';
import { AuthorizationGuard } from '@/authorization/authorization.guard';
import { PermissionsGuard } from '@/authorization/permissions.guard';

@UseGuards(AuthorizationGuard)
@ApiTags('brand')
@Controller()
export class BrandController {
  constructor(private readonly brandService: BrandService) {}

  @UseGuards(PermissionsGuard)
  @SetMetadata('permissions', ['admin'])
  @Get('brand')
  @ApiQuery({
    name: 'includeDeleted',
    required: false,
    type: 'boolean',
    description: 'Include deleted brands',
  })
  @ApiOkResponse({ type: [Brand] })
  getBrands(
    @Query('includeDeleted') includeDeleted: boolean = false,
  ): Promise<Brand[]> {
    return this.brandService.findAll(includeDeleted);
  }


  @Get('brand/:id')
  @ApiOkResponse({ type: Brand })
  getBrandById(@Param('id', ParseIntPipe) id: number): Promise<Brand> {
    return this.brandService.findById(id);
  }


  @Post('brand')
  @ApiCreatedResponse({
    type: Brand,
    description: 'Create brand',
  })
  createBrand(@Body() brand: CreateBrandDto): Promise<Brand> {
    return this.brandService.create(brand);
  }

  @Put('brand/:id')
  @ApiOkResponse({
    type: Brand,
    description: 'Update brand',
  })
  updateBrand(
    @Body() brand: UpdateBrandDto,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Brand> {
    return this.brandService.update(brand, id);
  }

  @Delete('brand/:id')
  @ApiOkResponse({
    type: Brand,
    description: 'Delete soft brand',
  })
  softDeleteBrand(@Param('id', ParseIntPipe) id: number): Promise<Brand> {
    return this.brandService.softDelete(id);
  }
}
