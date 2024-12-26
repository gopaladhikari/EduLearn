import { PartialType } from '@nestjs/mapped-types';
import { IsPhoneNumber, IsString } from 'class-validator';

class updateUserDto {
  @IsString()
  fullName: string;

  @IsPhoneNumber()
  phoneNumber: string;

  @IsString()
  bio: string;
}

export class UpdateUserDto extends PartialType(updateUserDto) {}
