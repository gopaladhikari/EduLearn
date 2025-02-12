import {
  IsEmail,
  IsEnum,
  IsStrongPassword,
  IsString,
} from 'class-validator';
import { Role } from '../entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @IsString()
  @ApiProperty({
    description: 'Fullname of the user',
    example: 'Test Admin',
  })
  fullName: string;

  @ApiProperty({
    description: 'Email of the user',
    example: 'admin@edulearn.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Strong password',
    example: 'Admin@123',
  })
  @IsStrongPassword()
  password: string;

  @IsEnum(Role)
  @ApiProperty({
    description: 'Role of the user',
    enum: Role,
    example: 'admin',
  })
  role: Role;
}
