import {
  IsArray,
  IsMongoId,
  IsString,
  IsOptional,
  IsEnum,
  IsNumberString,
} from 'class-validator';
import { CourseCategory } from '../entities/course.entity';

export class CreateCourseDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsArray()
  @IsMongoId({ each: true })
  instructor: string[];

  @IsArray()
  @IsOptional()
  lessons?: string[];

  @IsEnum(CourseCategory)
  category: CourseCategory;

  @IsArray()
  @IsOptional()
  tags?: string[];

  @IsNumberString()
  price: number;

  @IsString()
  @IsOptional()
  media?: string;
}
