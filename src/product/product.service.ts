import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Drug } from 'src/drug/entities/drug.entity';
import { Laboratory } from 'src/laboratory/entities/laboratory.entity';
import { Presentation } from 'src/presentation/entities/presentation.entity';

@Injectable()
export class ProductService {

  constructor(
    @InjectRepository( Product )
    private readonly productRepository: Repository<Product>,

    @InjectRepository( Drug )
    private readonly drugRepository: Repository<Drug>,

    @InjectRepository( Laboratory )
    private readonly lavoratoryRepository: Repository<Laboratory>,

    @InjectRepository( Presentation )
    private readonly presentationRepository: Repository<Presentation>,

    @InjectRepository( Drug )
    private readonly DrugRepository: Repository<Drug>,
  ) {}
  async create(createProductDto: CreateProductDto) {
    try {
      const product = this.productRepository.create(createProductDto);
      product.drug = await this.drugRepository.findOneBy({
        id: createProductDto.drugId
      })

      product.laboratory = await this.lavoratoryRepository.findOneBy({
        id: createProductDto.laboratoryId
      })
      
      product.presentation = await this.presentationRepository.findOneBy({
        id: createProductDto.presentationId
      })

      product.brand = await this.DrugRepository.findOneBy({
        id: createProductDto.brandId
      })

      await this.productRepository.save(product);
      return product;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException("Error creating Product");
    }
  }
  


  findAll() {
    return this.productRepository.find(
      {
        relations: {
          drug: true,
          laboratory: true,
          presentation: true,
          brand: true
        }
      }
    );
  }
  

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
