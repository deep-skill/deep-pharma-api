import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreatePresentationDto } from './dto/create-presentation.dto';
import { UpdatePresentationDto } from './dto/update-presentation.dto';
import { Presentation } from './entities/presentation.entity';
import { Like, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PresentationService {
  
  constructor(
    @InjectRepository( Presentation )
    private readonly presentationRepository: Repository<Presentation>
  ) {}
  async create(createPresentationDto: CreatePresentationDto) {
    try {
      const presentation = this.presentationRepository.create( createPresentationDto );

      await this.presentationRepository.save( presentation );
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
      const presentations = await this.presentationRepository.find(
        {
          relations: {
            products: {
              brand: true,
              category: true,
              drug: true,
              lots: true
            }
          },
          where:[
            { name: Like(`%${query}%`) },
            { products: { name: Like(`%${query}%`) } },
            { products: { description: Like(`%${query}%`) } },
            { products: { brand: { name: Like(`%${query}%`) } } },
            { products: { category: { name: Like(`%${query}%`) } } },
            { products: { drug: { name: Like(`%${query}%`) } } },
            { products: { drug: { therapeutic_function: Like(`%${query}%`) } } },
          ],
          select:{
            id: true,
            name: true,
            products: {
              id: true,
              name: true,
              description: true,
              brand: {
                id: true,
                name: true
              },
              category: {
                id: true,
                name: true
              },
              drug: {
                id: true,
                name: true,
                therapeutic_function: true
              },
              lots: {
                id: true,
                updated_stock: true
              }
            }
          }
        }
      );
      return presentations;
    } catch (error) {
      console.log(error)
      throw new InternalServerErrorException('Error Get all presentation')
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
