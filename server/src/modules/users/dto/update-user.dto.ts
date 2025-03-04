import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsPhoneNumber, IsString } from 'class-validator';

class updateUserDto {
  @ApiProperty({
    description: 'Fullname of the user',
    example: 'Updated Admin',
  })
  @IsString()
  fullName: string;

  @ApiProperty({
    description: 'Phone number of the user',
    example: '1234567890',
  })
  @IsPhoneNumber()
  phoneNumber: number;

  @ApiProperty({
    description: 'Bio of the user',
    example: 'New bio here',
  })
  @IsString()
  bio: string;

  @ApiProperty({
    description: 'Username of the user',
    example: 'updated_username',
  })
  @IsString()
  username: string;
}

export class UpdateUserDto extends PartialType(updateUserDto) {
  @ApiProperty({
    description: 'Avatar of the user',
    example: 'avatar.png',
    required: false,
  })
  avatar?: Express.Multer.File;
}
