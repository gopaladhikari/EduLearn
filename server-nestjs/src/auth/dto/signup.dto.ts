import { IsString, IsStrongPassword } from 'class-validator';

export class SignUpDto {
  @IsString()
  name: string;

  @IsString()
  email: string;

  @IsStrongPassword()
  password: string;
}
