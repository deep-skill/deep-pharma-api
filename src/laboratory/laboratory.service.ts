import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from "@nestjs/common";
import { CreateLaboratoryDto } from "./dto/create-laboratory.dto";
import { UpdateLaboratoryDto } from "./dto/update-laboratory.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Laboratory } from "./entities/laboratory.entity";
import { Repository } from "typeorm";

@Injectable()
export class LaboratoryService {
  constructor(
    @InjectRepository(Laboratory)
    private readonly laboratoryRepository: Repository<Laboratory>
  ) {}
  async create(createLaboratoryDto: CreateLaboratoryDto) {
    try {
      const laboratory = this.laboratoryRepository.create(createLaboratoryDto);
      await this.laboratoryRepository.save(laboratory);
      return laboratory;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException("Error creating laboratory");
    }
  }

  async findAll() {
    try {
      const laboratories = await this.laboratoryRepository.find();
      return laboratories;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException("Error Get all  laboratories");
    }
  }

  async findOne(id: number) {
    try {
      const laboratory = await this.laboratoryRepository.findOne({
        where: { id },
      });
      if (!laboratory) {
        throw new NotFoundException(`Error Get laboratory by id ${id}`);
      }
      return laboratory;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException("Error getting laboratory by id");
    }
  }

  async update(id: number, updateLaboratoryDto: UpdateLaboratoryDto) {
    try {
      const laboratory = await this.laboratoryRepository.findOne({
        where: { id },
      });
      if (!laboratory) {
        throw new NotFoundException(`Error update laboratory by id ${id}`);
      }
      await this.laboratoryRepository.update(id, updateLaboratoryDto);
      return true;
    } catch (error) {
      console.log(error);
      throw new NotFoundException(`Error update laboratory by id ${id}`);
    }
  }

  async remove(id: number) {
    try {
      const laboratory = await this.laboratoryRepository.findOne({
        where: { id },
      });
      if (!laboratory) {
        throw new NotFoundException(`Error remove laboratory by id ${id}`);
      }
      await this.laboratoryRepository.delete(id);
      return true;
    } catch (error) {
      console.log(error);
      throw new NotFoundException(`Error remove laboratory by id ${id}`);
    }
  }
}
