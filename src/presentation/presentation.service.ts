import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreatePresentationDto } from './dto/create-presentation.dto';
import { UpdatePresentationDto } from './dto/update-presentation.dto';
import { Presentation } from './entities/presentation.entity';
import { Repository } from 'typeorm';
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
      throw new InternalServerErrorException('Error creating presentation')
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

  async findOne(id: number) {
    try {
      const presentation = await this.presentationRepository.findOne({ where: { id } });
      if (!presentation) {
        throw new NotFoundException(`Error Get presentations by id ${id}`)
      }
      return presentation;
    } catch (error) {
      console.log(error)
      throw new InternalServerErrorException('Error Get presentation')
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
      throw new NotFoundException(`Error Get presentations by id ${id}`)
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
      throw new NotFoundException(`Error Get presentations by id ${id}`)
    }
  }
}
