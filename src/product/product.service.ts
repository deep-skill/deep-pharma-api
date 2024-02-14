import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Drug } from 'src/drug/entities/drug.entity';
import { Presentation } from 'src/presentation/entities/presentation.entity';
import { Brand } from 'src/brand/entities/brand.entity';
import { Type } from 'src/type/entities/type.entity';

@Injectable()
export class ProductService {

  constructor(
    @InjectRepository( Product )
    private readonly productRepository: Repository<Product>,

    @InjectRepository( Drug )
    private readonly drugRepository: Repository<Drug>,

    @InjectRepository( Presentation )
    private readonly presentationRepository: Repository<Presentation>,

    @InjectRepository( Brand )
    private readonly brandRepository: Repository<Brand>,

    @InjectRepository( Type )
    private readonly typeRepository: Repository<Type>,
  ) {}
  async create(createProductDto: CreateProductDto) {
    try {
      const product = this.productRepository.create(createProductDto);

      if(product.is_medicine){
        if(!createProductDto.drug_id || !createProductDto.laboratoryId || !createProductDto.presentation_id){
          throw new NotFoundException("Error creating Product. presentation, laboratory and drug cannot be null")
        }
        const drug = await this.drugRepository.findOneBy({
          id: createProductDto.drug_id
        })
        const presentation = await this.presentationRepository.findOneBy({
          id: createProductDto.presentation_id
        })
        if(!drug || !presentation){
          throw new NotFoundException("Error creating Product. None of these entities were found, presentation, laboratory and drug.")
        }
        product.presentation = presentation
        product.drug = drug
      }
       const brand = await this.brandRepository.findOneBy({
        id: createProductDto.brand_id
      })

      const type = await this.typeRepository.findOneBy({
        id: createProductDto.type_id
      })

      if(!brand || !type){
        throw new NotFoundException("Error creating Product. None of these entities were found, brand and type.")
      }

      product.brand = brand
      product.type = type

      await this.productRepository.save(product);
      return product;

    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(error);
    }
  }
  
  async findAll() {
    try {
      return await this.productRepository.find(
        {
          relations: {
            drug: true,
            presentation: true,
            brand: true
          }
        }
      );
    } catch (error) {
      console.log(error)
      throw new InternalServerErrorException(error);
    }
    
  }
  

  async findOne(id: number) {
    try {
      const product = await this.productRepository.findOne({ 
        where: { id },
        relations: { 
          drug: true,
          presentation: true,
          brand: true ,
          lots: true
        } });
        if(!product){
          throw new NotFoundException(`Error Get product by id ${id}`)
        }
        return product
    } catch (error) {
      console.log(error)
      throw new InternalServerErrorException(error);
    }
   
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    try {
      const product = await this.productRepository.findOne({ 
        where: { id },
        relations: { 
          drug: true,
          presentation: true,
          brand: true 
        } });

        if(product.is_medicine){
          if(!updateProductDto.drug_id || !updateProductDto.laboratoryId || !updateProductDto.presentation_id){
            throw new NotFoundException("Error update Product. presentation, laboratory and drug cannot be null")
          }
          const drug = await this.drugRepository.findOneBy({
            id: updateProductDto.drug_id
          })
          const presentation = await this.presentationRepository.findOneBy({
            id: updateProductDto.presentation_id
          })
          if(!drug ||  !presentation){
            throw new NotFoundException("Error update Product. None of these entities were found, presentation, laboratory and drug.")
          }
          product.presentation = presentation
          product.drug = drug 
    } 
      product.name = updateProductDto.name
      product.description = updateProductDto.description
      product.additional_info = updateProductDto.additional_info
      product.price = updateProductDto.price
      product.prescription_required = updateProductDto.prescription_required
      product.is_medicine = updateProductDto.is_medicine
      product.is_fractionable = updateProductDto.is_fractionable
    
      if(updateProductDto.brand_id){
        const brand = await this.brandRepository.findOneBy({
           id: updateProductDto.brand_id
        })
        if(!brand){
          throw new NotFoundException("Error update Product. None of these entities were found, brand.")
        }
        product.brand = brand
      }
      await this.productRepository.save(product);
    return product
  }
    catch (error) {
      console.log(error)
      throw new NotFoundException(error)
    }
  }

  async remove(id: number) {
    try {
      const role = await this.productRepository.findOne({ where: { id } });
      if (!role) {
        throw new NotFoundException(`Error Get product by id ${id}`)
      }
      await this.productRepository.delete(id);
      return true;
    } catch (error) {
      console.log(error)
      throw new NotFoundException(error)
    }
  }
}
