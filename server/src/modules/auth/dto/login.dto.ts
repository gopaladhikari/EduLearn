import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsStrongPassword } from 'class-validator';

export class LoginDto {
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
}
