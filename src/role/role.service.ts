import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from './entities/role.entity';

@Injectable()
export class RoleService {
  
  constructor (
    @InjectRepository(Role)
    private readonly roleRepository: Repository <Role>
  ) {}
  
  async create(createRoleDto: CreateRoleDto) {
    try {
      const role = this.roleRepository.create( createRoleDto );
      await this.roleRepository.save( role );
      return role;
    } catch (error) {
      console.log(error)
      throw new InternalServerErrorException('Error creating role')
    }
  }

  async findAll() {
    try {
      const roles = await this.roleRepository.find();
      return roles;
    } catch (error) {
      console.log(error)
      throw new InternalServerErrorException('Error Get all role')
    }
  }

  async findOne(id: number) {
    try {
      const role = await this.roleRepository.findOne({ where: { id } });
      if (!role) {
        throw new NotFoundException(`Error Get brands by id ${id}`)
      }
      return role;
    } catch (error) {
      console.log(error)
      throw new InternalServerErrorException('Error Get role')
    }
  }

  async update(id: number, updateRoleDto: UpdateRoleDto) {
    try {
      const role = await this.roleRepository.findOne({ where: { id } });
      if (!role) {
        throw new NotFoundException(`Error Get brands by id ${id}`)
      }
      await this.roleRepository.update(id, updateRoleDto);
      return true;
    } catch (error) {
      console.log(error)
      throw new NotFoundException(`Error Get roles by id ${id}`)
    }
  }

  async remove(id: number) {
    try {
      const role = await this.roleRepository.findOne({ where: { id } });
      if (!role) {
        throw new NotFoundException(`Error Get roles by id ${id}`)
      }
      await this.roleRepository.delete(id);
      return true;
    } catch (error) {
      console.log(error)
      throw new NotFoundException(`Error Get roles by id ${id}`)
    }
  }
}
