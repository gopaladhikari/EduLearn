import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CourseAnalyticsDocument = HydratedDocument<Analytics>;

@Schema({
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
})
export class Analytics {
  @Prop({
    required: true,
  })
  course: string;

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

export const AnalyticsSchema =
  SchemaFactory.createForClass(Analytics);

AnalyticsSchema.virtual('courseData', {
  ref: 'Course',
  localField: 'course',
  foreignField: 'slug',
  justOne: true,
});
