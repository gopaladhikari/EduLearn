import { IsEmail, IsStrongPassword } from 'class-validator';

export class Login {
  @IsEmail()
  email: string;

  @IsStrongPassword()
  password: string;
}
