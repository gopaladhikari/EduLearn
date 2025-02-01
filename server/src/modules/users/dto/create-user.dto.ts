import { IsEmail, IsEnum, IsStrongPassword } from 'class-validator';
import { Role } from '../entities/user.entity';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsStrongPassword()
  password: string;

  @IsEnum(Role)
  role: Role;
}
