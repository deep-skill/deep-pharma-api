import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from "@nestjs/common";
import { CreateSupplierDto } from "./dto/create-supplier.dto";
import { UpdateSupplierDto } from "./dto/update-supplier.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Supplier } from "./entities/supplier.entity";
import { Repository } from "typeorm";

@Injectable()
export class SupplierService {
  constructor(
    @InjectRepository(Supplier)
    private readonly supplierRepository: Repository<Supplier>
  ) {}
  async create(createSupplierDto: CreateSupplierDto) {
    try {
      const supplier = this.supplierRepository.create(createSupplierDto);
      await this.supplierRepository.save(supplier);
      return supplier;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException("Error creating supplier");
    }
  }

  async findAll() {
    try {
      const suppliers = await this.supplierRepository.find();
      return suppliers;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException("Error Get all drugs");
    }
  }

  async findOne(id: number) {
    try {
      const supplier = await this.supplierRepository.findOne({ where: { id } });
      if (!supplier) {
        throw new NotFoundException(`Error Get supplier by id ${id}`);
      }
      return supplier;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException("Error getting supplier");
    }
  }

  async update(id: number, updateSupplierDto: UpdateSupplierDto) {
    try {
      const supplier = await this.supplierRepository.findOne({ where: { id } });
      if (!supplier) {
        throw new NotFoundException(`Error update supplier by id ${id}`);
      }
      await this.supplierRepository.update(id, updateSupplierDto);
      return true;
    } catch (error) {
      console.log(error);
      throw new NotFoundException(`Error update supplier by id ${id}`);
    }
  }

  async remove(id: number) {
    try {
      const supplier = await this.supplierRepository.findOne({ where: { id } });
      if (!supplier) {
        throw new NotFoundException(`Error remove supplier by id ${id}`);
      }
      await this.supplierRepository.delete(id);
      return true;
    } catch (error) {
      console.log(error);
      throw new NotFoundException(`Error remove supplier by id ${id}`);
    }
  }
}
