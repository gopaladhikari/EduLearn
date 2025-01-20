import { Injectable } from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import type { Model } from 'mongoose';
import { CourseAnalytics } from './entities/analytics.entity';

@Injectable()
export class AnalyticsService {
  constructor(
    @InjectModel(CourseAnalytics.name)
    private readonly Analytics: Model<CourseAnalytics>,
  ) {}

  async incrementTotalClicks(slug: string) {
    try {
      const analytics = await this.Analytics.findOneAndUpdate(
        {
          courseSlug: slug,
        },
        {
          $inc: {
            totalClicks: 1,
          },
        },
        {
          upsert: true,
        },
      );

      return analytics;
    } catch (error) {
      throw error;
    }
  }
}
