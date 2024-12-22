import {
  IsEmail,
  IsNumberString,
  IsString,
  IsStrongPassword,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  fullName: string;

  @IsEmail()
  email: string;

  @IsNumberString()
  phoneNumber: string;

  @IsStrongPassword()
  password: string;
}
