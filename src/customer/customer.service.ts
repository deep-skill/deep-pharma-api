import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from "@nestjs/common";
import { CreateCustomerDto } from "./dto/create-customer.dto";
import { UpdateCustomerDto } from "./dto/update-customer.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Customer } from "./entities/customer.entity";
import { Repository } from "typeorm";

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>
  ) {}
  async create(createCustomerDto: CreateCustomerDto) {
    try {
      const customer = this.customerRepository.create(createCustomerDto);
      await this.customerRepository.save(customer);
      return customer;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException("Error creating customer");
    }
  }

  async findAll() {
    try {
      const customers = await this.customerRepository.find();
      return customers;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException("Error Gettting all  customers");
    }
  }

  async findOne(id: number) {
    try {
      const customer = await this.customerRepository.findOne({
        where: { id },
      });
      if (!customer) {
        throw new NotFoundException(`Error Get customer by id ${id}`);
      }
      return customer;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException("Error getting customer by id");
    }
  }

  async update(id: number, updateCustomerDto: UpdateCustomerDto) {
    try {
      const customer = await this.customerRepository.findOne({
        where: { id },
      });
      if (!customer) {
        throw new NotFoundException(`Error update customer by id ${id}`);
      }
      await this.customerRepository.update(id, updateCustomerDto);
      return true;
    } catch (error) {
      console.log(error);
      throw new NotFoundException(`Error update customer by id ${id}`);
    }
  }

  async remove(id: number) {
    try {
      const customer = await this.customerRepository.findOne({
        where: { id },
      });
      if (!customer) {
        throw new NotFoundException(`Error remove customer by id ${id}`);
      }
      await this.customerRepository.delete(id);
      return true;
    } catch (error) {
      console.log(error);
      throw new NotFoundException(`Error remove customer by id ${id}`);
    }
  }
}
