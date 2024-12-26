import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectModel } from '@nestjs/mongoose';
import type { FilterQuery, Model } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly User: Model<User>,
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    try {
      const user = await this.User.create(createUserDto);
      return user;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getUser(query?: FilterQuery<User>) {
    try {
      const user = await this.User.findOne(query);
      if (!user) throw new NotFoundException('User not found');
      return user;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getAllUser() {
    try {
      const users = await this.User.find({});
      return users;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto) {}
}
