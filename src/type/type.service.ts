import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateTypeDto } from './dto/create-type.dto';
import { UpdateTypeDto } from './dto/update-type.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Type } from './entities/type.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TypeService {

  constructor(
    @InjectRepository( Type )
    private readonly brandRepository: Repository<Type>
  ) {}
  async create(createTypeDto: CreateTypeDto) {
    try {
      const type = this.brandRepository.create( createTypeDto );
      await this.brandRepository.save( type );
      return type;
    } catch (error) {
      console.log(error)
      throw new InternalServerErrorException(error)
    }
  }

  async findAll() {
    try {
      const types = await this.brandRepository.find();
      return types;
    } catch (error) {
      console.log(error)
      throw new InternalServerErrorException(error)
    }
  }

  async findOne(id: number) {
    try {
      const type = await this.brandRepository.findOne({ where: { id } });
      if (!type) {
        throw new NotFoundException(`Error Get type by id ${id}`)
      }
      return type;
    } catch (error) {
      console.log(error)
      throw new InternalServerErrorException(error)
    }
  }

  async update(id: number, updateTypeDto: UpdateTypeDto) {
    try {
      const type = await this.brandRepository.findOne({ where: { id } });
      if (!type) {
        throw new NotFoundException(`Error Get brands by id ${id}`)
      }
      await this.brandRepository.update(id, updateTypeDto);
      return true;
    } catch (error) {
      console.log(error)
      throw new NotFoundException(error)
    }
  }

  async remove(id: number) {
    try {
      const type = await this.brandRepository.findOne({ where: { id } });
      if (!type) {
        throw new NotFoundException(`Error Get brands by id ${id}`)
      }
      await this.brandRepository.delete(id);
      return true;
    } catch (error) {
      console.log(error)
      throw new NotFoundException(error)
    }
  }
}
