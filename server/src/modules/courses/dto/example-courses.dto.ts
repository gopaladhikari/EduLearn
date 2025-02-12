import { ApiProperty } from '@nestjs/swagger';

export class CourseDto {
  @ApiProperty({ example: 'introduction-to-nestjs' })
  slug: string;

  @ApiProperty({ example: 'Introduction to NestJS' })
  title: string;

  @ApiProperty({ example: 'Learn the basics of NestJS' })
  description: string;

  @ApiProperty({ example: 'web-development' })
  category: string;

  @ApiProperty({ example: 79.99 })
  price: number;

  @ApiProperty({ example: true })
  isPublished: boolean;

  @ApiProperty({
    example:
      'https://res.cloudinary.com/demo/image/upload/v1234/webdev-thumb.jpg',
  })
  thumbnail: {
    url: string;
    publicId: string;
  };
}
