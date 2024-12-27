import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, type UserDocument } from './entities/user.entity';
import { InjectModel } from '@nestjs/mongoose';
import { type FilterQuery, type Model } from 'mongoose';
import type { UpdatePasswordDto } from './dto/update-password.dto';
import { compare } from 'bcrypt';
import { MailService } from '../mail/mail.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly User: Model<User>,
    private readonly mail: MailService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  generateJwtToken(user: UserDocument) {
    const payload = {
      _id: user._id,
      email: user.email,
    };

    const token = this.jwtService.sign(payload, {
      secret: this.configService.getOrThrow('JWT_SECRET'),
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

      return data;
    } catch (error) {
      if (error.code === 11000) {
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
      const user = await this.User.findOne(query);
      if (!user) throw new NotFoundException('User not found');
      return user;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new BadRequestException(error.message);
    }
  }

  async getAllUser() {
    try {
      const users = await this.User.find({});

      if (!users.length) throw new NotFoundException('No user found');

      return users;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new BadRequestException(error.message);
    }
  }

  async updateUser(user: UserDocument, updateUserDto: UpdateUserDto) {
    if (updateUserDto.fullName)
      user.fullName = updateUserDto.fullName;
    if (updateUserDto.phoneNumber)
      user.phoneNumber = updateUserDto.phoneNumber;
    if (updateUserDto.bio) user.bio = updateUserDto.bio;

    try {
      await user.save();
      return user;
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
      return user;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
