import { IsEmail, IsEnum, IsStrongPassword } from 'class-validator';

export class Login {
  @IsEmail()
  email: string;

  @IsStrongPassword()
  password: string;

  @IsEnum(['admin', 'user'])
  role: 'admin' | 'user';
}
