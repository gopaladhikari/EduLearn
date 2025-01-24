import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, type UserDocument } from './entities/user.entity';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { type FilterQuery, type Model } from 'mongoose';
import type { UpdatePasswordDto } from './dto/update-password.dto';
import { compare } from 'bcrypt';
import { MailService } from '../mail/mail.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import type { Cache } from 'cache-manager';
import type { Payload } from '../auth/auth.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly User: Model<User>,
    @Inject(CACHE_MANAGER) private readonly cache: Cache,
    private readonly mail: MailService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  generateJwtToken(user: UserDocument) {
    const payload: Payload = {
      _id: user._id,
      email: user.email,
    };

    const token = this.jwtService.sign(payload, {
      secret: this.configService.getOrThrow('JWT_SECRET'),
      expiresIn: '7d',
    });
    return token;
  }

  async createUser(createUserDto: CreateUserDto) {
    try {
      const user = await this.User.create(createUserDto);

      const accessToken = this.generateJwtToken(user);

      const data = await this.mail.sendVerifyEmail(
        user.fullName,
        user.email,
        accessToken,
      );

      user.jwtToken = accessToken;
      await user.save();

      await this.cache.clear();
      return data;
    } catch (error) {
      if (error instanceof mongoose.mongo.MongoServerError) {
        const duplicateField = Object.keys(error.keyPattern)[0];
        throw new BadRequestException(
          `A user with this ${duplicateField} already exists`,
        );
      }
      throw new BadRequestException(error.message);
    }
  }

  async getUser(query?: FilterQuery<User>) {
    try {
      const cacheKey = `user-${Object.values(query)[0]}`;

      const cachedUser = await this.cache.get(cacheKey);

      if (cachedUser) return cachedUser as UserDocument;

      const user = await this.User.findOne(query);
      if (!user) throw new NotFoundException('User not found');

      await this.cache.set(cacheKey, user);

      return user;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new BadRequestException(error.message);
    }
  }

  async getAllUser() {
    try {
      const cacheKey = 'allUsers';

      const cachedUsers = await this.cache.get(cacheKey);

      if (cachedUsers) return cachedUsers;

      const users = await this.User.find({
        verified: true,
        status: 'active',
      });

      if (!users.length) throw new NotFoundException('No user found');

      await this.cache.set(cacheKey, cachedUsers);

      return users;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new BadRequestException(error.message);
    }
  }

  async updateUser(user: UserDocument, updateUserDto: UpdateUserDto) {
    try {
      const updatedUser = await this.User.findOneAndUpdate(
        { _id: user._id },
        updateUserDto,
        { new: true },
      ).select('-password');

      if (!updatedUser) throw new NotFoundException('User not found');

      await this.cache.clear();

      return {
        message: 'User updated successfully',
        data: updatedUser,
      };
    } catch (error) {
      console.log(error);
      throw new BadRequestException(error.message);
    }
  }

  async updatePassword(
    user: UserDocument,
    updatePasswordDto: UpdatePasswordDto,
  ) {
    const isPasswordCorrect = await compare(
      updatePasswordDto.oldPassword,
      user.password,
    );

    if (!isPasswordCorrect)
      throw new BadRequestException('Invalid old password');

    if (
      updatePasswordDto.newPassword !==
      updatePasswordDto.confirmPassword
    )
      throw new BadRequestException(
        'New password and confirm password do not match',
      );

    user.password = updatePasswordDto.newPassword;
    try {
      await user.save();
      await this.cache.clear();
      return user;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
