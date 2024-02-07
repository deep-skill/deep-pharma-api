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

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}
  async create(createUserDto: CreateUserDto) {
    try {
      const user = this.userRepository.create(createUserDto);
      await this.userRepository.save(user);
      return user;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException("Error creating user");
    }
  }

  async findAll() {
    try {
      const users = await this.userRepository.find();
      return users;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException("Error Get all  users");
    }
  }

  async findOne(id: number) {
    try {
      const user = await this.userRepository.findOne({ where: { id } });
      if (!user) {
        throw new NotFoundException(`Error Get user by id ${id}`);
      }
      return user;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException("Error getting user");
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      const user = await this.userRepository.findOne({ where: { id } });
      if (!user) {
        throw new NotFoundException(`Error update user by id ${id}`);
      }
      await this.userRepository.update(id, updateUserDto);
      return true;
    } catch (error) {
      console.log(error);
      throw new NotFoundException(`Error update user by id ${id}`);
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
      throw new NotFoundException(`Error remove user by id ${id}`);
    }
  }
}
