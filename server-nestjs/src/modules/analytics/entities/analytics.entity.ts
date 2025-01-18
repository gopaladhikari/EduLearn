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

  @Prop({ type: Number, default: 0 })
  totalEnrollments: number;

  @Prop({ type: Number, default: 0 })
  totalClicks: number;

  @Prop({ type: Number, default: 0 })
  totalCompletions: number;

  @Prop({ type: Number, default: 0 })
  averageProgress: number;

  @Prop({ type: Number, default: 0 })
  activeUsers: number;

  @Prop({ type: Number, default: 0 })
  totalRevenue: number;

  @Prop({ type: Number, default: 0 })
  discountedSales: number;

  @Prop({ type: Number, default: 0 })
  refunds: number;

  @Prop({ type: Number, default: 0 })
  averageRating: number;

  @Prop({ type: Number, default: 0 })
  totalReviews: number;

  @Prop({ type: [String], default: [] })
  commonFeedback: string[];

  @Prop({ default: '' })
  mostViewedLesson: string;

  @Prop({ default: '' })
  dropOffPoint: string;

  @Prop({ type: Number, default: 0 })
  totalWatchTime: number;

  @Prop({ type: Number, default: 0 })
  popularityScore: number;

  @Prop({ type: Number, default: 0 })
  trendScore: number;
}

export const CourseAnalyticsSchema =
  SchemaFactory.createForClass(CourseAnalytics);
