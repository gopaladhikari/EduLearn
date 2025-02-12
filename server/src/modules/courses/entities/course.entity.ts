import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import type { HydratedDocument } from 'mongoose';
import mongoose from 'mongoose';
import { CourseCategory } from 'src/config/constant';
import type { User } from 'src/modules/users/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';

export type CourseDocument = HydratedDocument<Course>;

@Schema({ timestamps: true })
export class Course {
  @ApiProperty({
    example: 'Advanced JavaScript Concepts',
    description: 'Course title',
  })
  @Prop({ required: true })
  title: string;

  @ApiProperty({
    example: 'Master modern JavaScript features',
    description: 'Course description',
  })
  @Prop({ required: true })
  description: string;

  @ApiProperty({
    example: 'advanced-javascript-concepts',
    description: 'URL-friendly course slug',
  })
  @Prop({ unique: true, sparse: true })
  slug: string;

  @ApiProperty({
    type: [String],
    example: ['65f8d7e4c4b5d12a5c3e4f5a'],
    description: 'Instructor user IDs',
  })
  @Prop({
    required: true,
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  })
  instructor: User[];

  @ApiProperty({
    example: {
      url: 'https://res.cloudinary.com/demo/video/upload/v1234/course-video.mp4',
      publicId: 'course-video-1234',
    },
  })
  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  })
  uploadedBy: User;

  @Prop()
  lessons: string[];

  @Prop({ default: false })
  isPublished: boolean;

  @Prop({
    type: {
      url: String,
      publicId: String,
    },
  })
  thumbnail: {
    url: string;
    publicId: string;
  };

  @Prop({
    required: true,
    enum: CourseCategory,
  })
  category: CourseCategory;

  @Prop({ required: true })
  tags: string[];

  @Prop({ required: true, default: 0 })
  price: number;

  @Prop()
  isPopular: boolean;

  @Prop()
  isBestSeller: boolean;

  @Prop({
    required: true,
    type: {
      url: String,
      publicId: String,
    },
  })
  video: {
    url: string;
    publicId: string;
  };
}

export const CourseSchema = SchemaFactory.createForClass(Course);
