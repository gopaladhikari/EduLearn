import {
  IsArray,
  IsMongoId,
  IsString,
  IsOptional,
  IsEnum,
  IsNumberString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CourseCategory } from '../entities/courses-categories';

export class CreateCourseDto {
  @ApiProperty({
    example: 'Advanced JavaScript Concepts',
    description: 'Course title',
  })
  @IsString()
  title: string;

  @ApiProperty({
    example:
      'Master modern JavaScript features including ES6+ syntax',
    description: 'Detailed course description',
  })
  @IsString()
  description: string;

  @IsArray()
  @IsMongoId({ each: true })
  instructor: string[];

  @IsArray()
  @IsOptional()
  lessons?: string[];

  @ApiProperty({
    enum: CourseCategory,
    example: CourseCategory.WebDevelopment,
    description: 'Course category',
  })
  @IsEnum(CourseCategory)
  category: CourseCategory;

  @ApiProperty({
    example: ['javascript', 'web', 'es6'],
    description: 'Search tags for the course',
    required: false,
  })
  @IsArray()
  @IsOptional()
  tags?: string[];

  @ApiProperty({
    example: 79.99,
    description: 'Course price in USD',
  })
  @IsNumberString()
  price: number;

  @IsString()
  @IsOptional()
  media?: string;
}
