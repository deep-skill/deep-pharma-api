import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User } from "./entities/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Role } from "src/role/entities/role.entity";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>
  ) {}
  async create(createUserDto: CreateUserDto) {
    try {
      const user = this.userRepository.create(createUserDto);
      user.role = await this.roleRepository.findOneBy({
        id: createUserDto.roleId,
      });
      await this.userRepository.save(user);
      return user;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(error);
    }
  }

  async findAll() {
    try {
      const users = await this.userRepository.find();
      return users;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(error);
    }
  }

  async findOne(id: number) {
    try {
      const user = await this.userRepository.findOne({
        where: { id },
        relations: { role: true },
      });
      if (!user) {
        throw new NotFoundException(`Error Get user by id ${id}`);
      }
      return user;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(error);
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      const user = await this.userRepository.findOne({ where: { id } });
      user.role = await this.roleRepository.findOneBy({
        id: updateUserDto.roleId,
      });
      if (!user) {
        throw new NotFoundException(`Error expeption update user by id ${id}`);
      }
      await this.userRepository.save(user);
      return true;
    } catch (error) {
      console.log(error);
      throw new NotFoundException(error);
    }
  }

  async remove(id: number) {
    try {
      const user = await this.userRepository.findOne({ where: { id } });
      if (!user) {
        throw new NotFoundException(`Error remove user by id ${id}`);
      }
      await this.userRepository.delete(id);
      return true;
    } catch (error) {
      console.log(error);
      throw new NotFoundException(error);
    }
  }
}
