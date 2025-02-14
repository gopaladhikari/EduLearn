import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import type { HydratedDocument } from 'mongoose';
import mongoose from 'mongoose';
import type { User } from 'src/modules/users/entities/user.entity';
import { CourseCategory } from './courses-categories';

export type CourseDocument = HydratedDocument<Course>;

@Schema({ timestamps: true })
export class Course {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ unique: true, sparse: true })
  slug: string;

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
