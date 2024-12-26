import { IsEnum, IsString, IsStrongPassword } from 'class-validator';

export class SignUpDto {
  @IsString()
  email: string;

  @IsStrongPassword()
  password: string;

  @IsEnum(['admin', 'user'])
  role: 'admin' | 'user';
}
