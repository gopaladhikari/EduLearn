import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsEmail, IsPhoneNumber, IsString } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsString()
  fullName: string;

  @IsEmail()
  email: string;

  @IsPhoneNumber()
  phoneNumber: string;

  @IsString()
  bio: string;

  @IsString()
  avatarUrl: string;
}
