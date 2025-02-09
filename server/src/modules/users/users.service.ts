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
import * as path from 'path';
import * as fs from 'fs';
import { v2 as cloudinary } from 'cloudinary';

@Injectable()
export class UsersService {
  private readonly cloudinary = cloudinary;
  constructor(
    @InjectModel(User.name) private readonly User: Model<User>,
    @Inject(CACHE_MANAGER) private readonly cache: Cache,
    private readonly mail: MailService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {
    this.cloudinary.config({
      cloud_name: this.configService.getOrThrow(
        'CLOUDINARY_CLOUD_NAME',
      ),
      api_key: this.configService.getOrThrow('CLOUDINARY_API_KEY'),
      api_secret: this.configService.getOrThrow(
        'CLOUDINARY_API_SECRET',
      ),
    });
  }

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
        user.role,
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

      if (cachedUser) return this.User.hydrate(cachedUser);

      const user = await this.User.findOne(query);
      if (!user)
        throw new NotFoundException('Invalid email or password');

      await this.cache.set(cacheKey, user);

      return user;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new BadRequestException(error.message);
    }
  }

  async getAllUser(query?: FilterQuery<User>) {
    try {
      const cacheKey = `allUsers`;

      const cachedUsers = await this.cache.get(cacheKey);

      if (cachedUsers)
        return {
          message: 'Users fetched successfully',
          data: cachedUsers,
        };

      const users = await this.User.find(query);

      if (!users.length) throw new NotFoundException('No user found');

      await this.cache.set(cacheKey, users);

      return {
        message: 'Users fetched successfully',
        data: users,
      };
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new BadRequestException(error.message);
    }
  }

  async updateUser(
    user: UserDocument,
    updateUserDto: UpdateUserDto,
    avatar: Express.Multer.File,
  ) {
    if (avatar) {
      const localFilePath = path.join(process.cwd(), avatar.path);
      try {
        if (fs.existsSync(localFilePath)) {
          const result = await this.cloudinary.uploader.upload(
            localFilePath,
            {
              resource_type: 'image',
              folder: 'EduLearn/avatars',
              transformation: {
                quality: 'auto',
                fetch_format: 'auto',
              },
              eager_async: true,
            },
          );

          const updatedUser = await this.User.findByIdAndUpdate(
            user._id,
            {
              avatar: {
                url: result.url,
                publicId: result.public_id,
              },
            },
            {
              new: true,
            },
          ).select('-password');

          if (user.avatar?.publicId) {
            await this.cloudinary.api.delete_resources(
              [user.avatar.publicId.toString()],
              {
                resource_type: 'image',
                type: 'upload',
              },
            );
          }

          return {
            message: 'Avatar updated successfully',
            data: updatedUser,
          };
        } else throw new BadRequestException('Avatar not found');
      } catch (error) {
        throw new BadRequestException(error.message);
      } finally {
        if (fs.existsSync(localFilePath))
          fs.unlinkSync(localFilePath);
      }
    }

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
      return {
        message: 'Password updated successfully',
        data: user,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
