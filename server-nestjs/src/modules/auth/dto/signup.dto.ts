import { IsString, IsStrongPassword } from 'class-validator';

export class SignUpDto {
  @IsString()
  fullName: string;

  @IsString()
  email: string;

  @IsStrongPassword()
  password: string;
}
