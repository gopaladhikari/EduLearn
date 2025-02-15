import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsStrongPassword } from 'class-validator';

export class UpdatePasswordDto {
  @ApiProperty({
    description: 'Old password',
    example: 'OldPassword@123',
  })
  @IsString()
  oldPassword: string;

  @ApiProperty({
    description: 'New password',
    example: 'NewPassword@123',
  })
  @IsStrongPassword()
  newPassword: string;

  @ApiProperty({
    description: 'Confirm new password',
    example: 'NewPassword@123',
  })
  @IsString()
  confirmPassword: string;
}
