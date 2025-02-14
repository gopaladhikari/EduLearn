import { ApiProperty } from '@nestjs/swagger';

export class CourseResponseDto {
  @ApiProperty({ example: '65f8d7e4c4b5d12a5c3e4f5a' })
  _id: string;

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
    example: {
      url: 'https://res.cloudinary.com/demo/image/upload/v1674081937/course-thumbnail.png',
      publicId: 'course-thumbnail-1234',
    },
  })
  thumbnail: {
    url: string;
    publicId: string;
  };

  @ApiProperty({
    example: {
      url: 'https://res.cloudinary.com/demo/video/upload/v1234/course-video.mp4',
      publicId: 'course-video-1234',
    },
  })
  video: {
    url: string;
    publicId: string;
  };

  @ApiProperty({ example: ['javascript', 'web', 'es6'] })
  tags: string[];

  @ApiProperty({ example: ['65f8d7e4c4b5d12a5c3e4f5a'] })
  instructor: string[];

  @ApiProperty({ example: ['javascript', 'web', 'es6'] })
  lessons: string[];

  @ApiProperty({ example: true })
  isPopular: boolean;

  @ApiProperty({ example: false })
  isBestSeller: boolean;
}
