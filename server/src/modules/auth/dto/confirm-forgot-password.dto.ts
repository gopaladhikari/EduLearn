import { IsEmail, IsString, IsStrongPassword } from 'class-validator';

export class ConfirmForgotPasswordDto {
  @IsEmail()
  email: string;

  @IsStrongPassword()
  password: string;

  @IsString()
  confirmPassword: string;
}
