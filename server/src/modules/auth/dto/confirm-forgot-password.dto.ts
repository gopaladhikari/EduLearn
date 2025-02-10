import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, IsStrongPassword } from 'class-validator';

export class ConfirmForgotPasswordDto {
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

  @ApiProperty({
    description: 'Confirm password',
    example: 'Admin@123',
  })
  @IsString()
  confirmPassword: string;
}
