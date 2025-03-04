import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Role, Status } from '../entities/user.entity';

export class UserResponseDto {
  @ApiProperty({ example: '65f8d7e4c4b5d12a5c3e4f5a' })
  _id: string;

  @ApiProperty({ example: 'Test Admin' })
  fullName: string;

  @ApiProperty({ example: 'admin@edulearn.com' })
  email: string;

  @ApiProperty({ example: 'admin123' })
  username: string;

  @ApiProperty({ example: 1234567890 })
  phoneNumber: number;

  @ApiProperty({ example: Role.Admin })
  role: Role;

  @ApiProperty({ example: false })
  verified: boolean;

  @ApiProperty({
    enum: Status,
    example: Status.Active,
  })
  status: Status;

  @ApiProperty({
    example: {
      url: 'https://res.cloudinary.com/demo/image/upload/v1674081937/user-avatar.png',
      publicId: 'user-avatar-1234',
    },
  })
  avatar: {
    url: string;
    publicId: string;
  };

  @ApiProperty()
  bio: string;
}

export class UserQueryExampleDto extends PartialType(
  UserResponseDto,
) {}
