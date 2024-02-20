import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { Like, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Drug } from 'src/drug/entities/drug.entity';
import { Presentation } from 'src/presentation/entities/presentation.entity';
import { Brand } from 'src/brand/entities/brand.entity';
import { Category } from 'src/category/entities/category.entity';
import { SuggestedPrice } from 'src/suggested_price/entities/suggested_price.entity';

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

    @InjectRepository( Category )
    private readonly categoryRepository: Repository<Category>,
   
    @InjectRepository( SuggestedPrice )
    private readonly priceRepository: Repository<SuggestedPrice>,
  ) {}
  async create(createProductDto: CreateProductDto) {
    try {
      const product = await this.productRepository.create(createProductDto);
      
      
      if(createProductDto.category_id=== 1){
        if(!createProductDto.drug_id ||  !createProductDto.presentation_id){
          throw new NotFoundException("Error creating Product. presentation and drug cannot be null")
        }
        const drug = await this.drugRepository.findOneBy({
          id: createProductDto.drug_id
        })
        const presentation = await this.presentationRepository.findOneBy({
          id: createProductDto.presentation_id
        })
        if(!drug || !presentation){
          throw new NotFoundException("Error creating Product. None of these entities were found, presentation and drug.")
        }
        product.presentation = presentation
        product.drug = drug
      }
       const brand = await this.brandRepository.findOneBy({
        id: createProductDto.brand_id
      })

      const category = await this.categoryRepository.findOneBy({
        id: createProductDto.category_id
      })

      if(!brand || !category){
        throw new NotFoundException("Error creating Product. None of these entities were found, brand and type.")
      }
      
      product.brand = brand
      product.category = category

      await this.productRepository.save(product);
      const price = await this.priceRepository.create(  { 
        price: createProductDto.new_price, 
        date_time: new Date(), 
        products: product, 
        created_by: createProductDto.created_by
       } );
      await this.priceRepository.save(price);

      product.suggested_price = price
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
            brand: true,
            category: true,
            lots: true,
            suggested_price: true
          }
        }
      );
    } catch (error) {
      console.log(error)
      throw new InternalServerErrorException(error);
    } 
  }
  
  async searchByQuery({ query }: { query: string }) {
    try {
      //const products = await this.productRepository.createQueryBuilder('product')
      //.leftJoinAndSelect('product.brand', 'brand') // Utiliza leftJoinAndSelect para incluir la entidad Brand
      //.where('product.name ILIKE :query', { query: `%${query}%` })
      //.orWhere('product.description ILIKE :query', { query: `%${query}%` })
      //.orWhere('brand.name ILIKE :query', { query: `%${query}%` })
      //.getMany();

      const products = await this.productRepository.find({
        where: [
          { name: Like(`%${query}%`) },
          { description: Like(`%${query}%`) },
          { brand: { name: Like(`%${query}%`) }}
        ],
        
        
        relations: { 
          drug: true,
          presentation: true,
          brand: true,
          category: true,
          lots: true,
          suggested_price: true
        }
      })

      return products
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
          lots: true,
          suggested_price: true,
          category: true
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
          brand: true,
          category: true,
          suggested_price: true 
        } });

        const price = await this.priceRepository.create(  { 
            price: updateProductDto.new_price, 
            date_time: new Date(),
            products: product,
            created_by: updateProductDto.updated_by
          } );
        if(updateProductDto.category_id=== 1){
          if(!updateProductDto.drug_id || !updateProductDto.presentation_id){
            throw new NotFoundException("Error update Product. presentation and drug cannot be null")
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
      product.updated_by = updateProductDto.updated_by
      product.name = updateProductDto.name
      product.description = updateProductDto.description
      product.prescription_required = updateProductDto.prescription_required
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
      await this.priceRepository.save(price);

      product.suggested_price = price
  
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
