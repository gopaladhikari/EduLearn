import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type CourseAnalyticsDocument =
  HydratedDocument<CourseAnalytics>;

@Schema({ timestamps: true })
export class CourseAnalytics {
  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
  })
  courseId: mongoose.Schema.Types.ObjectId;

  @Prop({
    required: true,
    type: String,
    ref: 'Course',
  })
  courseSlug: string;

  @Prop({ default: 0 })
  totalEnrollments: number;

  @Prop({ default: 0 })
  totalCompletions: number;

  @Prop({ default: 0 })
  averageProgress: number;

  @Prop({ default: 0 })
  activeUsers: number;

  @Prop({ default: 0 })
  totalRevenue: number;

  @Prop({ default: 0 })
  discountedSales: number;

  @Prop({ default: 0 })
  refunds: number;

  @Prop({ default: 0 })
  averageRating: number;

  @Prop({ default: 0 })
  totalReviews: number;

  @Prop({ type: [String], default: [] })
  commonFeedback: string[];

  @Prop({ default: '' })
  mostViewedLesson: string;

  @Prop({ default: '' })
  dropOffPoint: string;

  @Prop({ default: 0 })
  totalWatchTime: number;

  @Prop({ default: 0 })
  popularityScore: number;

  @Prop({ default: 0 })
  trendScore: number;
}

export const CourseAnalyticsSchema =
  SchemaFactory.createForClass(CourseAnalytics);
