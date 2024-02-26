import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreatePresentationDto } from './dto/create-presentation.dto';
import { UpdatePresentationDto } from './dto/update-presentation.dto';
import { Presentation } from './entities/presentation.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PresentationService {

  constructor(
    @InjectRepository(Presentation)
    private readonly presentationRepository: Repository<Presentation>
  ) { }
  async create(createPresentationDto: CreatePresentationDto) {
    try {
      const presentation = this.presentationRepository.create(createPresentationDto);

      await this.presentationRepository.save(presentation);
      return presentation;
    } catch (error) {
      console.log(error)
      throw new InternalServerErrorException(error)
    }
  }

  async findAll() {
    try {
      const presentations = await this.presentationRepository.find();
      return presentations;
    } catch (error) {
      console.log(error)
      throw new InternalServerErrorException('Error Get all presentation')
    }
  }

  async getBySelectProduct(query: string) {
    try {
      const presentations = await this.presentationRepository.find(
        {
          where: {
            name: Like(`%${query}%`)
          },
          select: {
            id: true,
            name: true
          }
        }
      );
      return presentations;
    } catch (error) {
      console.log(error)
      throw new InternalServerErrorException(error)
    }
  }

  async searchByQuery({ query }: { query: string }) {
    try {

      const createQueryBuilder = this.presentationRepository.createQueryBuilder('presentation')

      const presentations = await createQueryBuilder
        .leftJoinAndSelect('presentation.products', 'product')
        .leftJoinAndSelect('product.brand', 'brand')
        .leftJoinAndSelect('product.category', 'category')
        .leftJoinAndSelect('product.drug', 'drug')
        .leftJoinAndSelect('product.lots', 'lot')
        .leftJoinAndSelect('product.suggested_price', 'suggested_price')
        .where('(lot.lot_state = :lot_state OR lot.lot_state IS NULL)', { lot_state: true })
        .andWhere('(product.name LIKE :query OR product.description LIKE :query OR brand.name LIKE :query OR category.name LIKE :query OR drug.name LIKE :query OR drug.therapeutic_function LIKE :query)', { query: `%${query}%` })
        .select(['presentation.id', 'presentation.name', 'product.id', 'product.name', 'product.description', 'brand.id', 'brand.name', 'category.id', 'category.name', 'drug.id', 'drug.name', 'drug.therapeutic_function', 'drug.concentration', 'lot.id', 'lot.updated_stock', 'lot.lot_state', 'suggested_price.id', 'suggested_price.price'])
        .getMany();

      return presentations;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Error fetching data on Home Page');
    }
  }

  async findOne(id: number) {
    try {
      const presentation = await this.presentationRepository.findOne({ where: { id } });
      if (!presentation) {
        throw new NotFoundException(`Error Get presentations by id ${id}`)
      }
      return presentation;
    } catch (error) {
      console.log(error)
      throw new InternalServerErrorException(error)
    }
  }

  async update(id: number, updatePresentationDto: UpdatePresentationDto) {
    try {
      const presentation = await this.presentationRepository.findOne({ where: { id } });
      if (!presentation) {
        throw new NotFoundException(`Error Get presentations by id ${id}`)
      }
      await this.presentationRepository.update(id, updatePresentationDto);
      return true;
    } catch (error) {
      console.log(error)
      throw new NotFoundException(error)
    }
  }

  async remove(id: number) {
    try {
      const presentation = await this.presentationRepository.findOne({ where: { id } });
      if (!presentation) {
        throw new NotFoundException(`Error Get presentations by id ${id}`)
      }
      await this.presentationRepository.delete(id);
      return true;
    } catch (error) {
      console.log(error)
      throw new NotFoundException(error)
    }
  }
}
