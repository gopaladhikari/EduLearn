import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import type { Model } from 'mongoose';
import { CourseAnalytics } from './entities/analytics.entity';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import type { Cache } from 'cache-manager';

@Injectable()
export class AnalyticsService {
  constructor(
    @Inject(CACHE_MANAGER) private readonly cache: Cache,
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

      await this.cache.clear();
      return {
        message: 'Analytics updated successfully',
        data: analytics,
      };
    } catch (error) {
      throw new BadRequestException((error as Error).message);
    }
  }

  async getPlatformAnalytics() {
    try {
      const cachedAnalytics = await this.cache.get(
        'platform_analytics',
      );
      if (cachedAnalytics)
        return {
          message: 'Platform analytics fetched successfully',
          data: cachedAnalytics,
        };

      const platformAnalytics = await this.Analytics.aggregate([
        {
          $facet: {
            totalCourses: [
              { $group: { _id: null, total: { $sum: 1 } } },
            ],
            totalEnrollments: [
              {
                $group: {
                  _id: null,
                  total: { $sum: '$totalEnrollments' },
                },
              },
            ],
            totalRevenue: [
              {
                $group: {
                  _id: null,
                  total: { $sum: '$totalRevenue' },
                },
              },
            ],
            totalRefunds: [
              { $group: { _id: null, total: { $sum: '$refunds' } } },
            ],
            averageCourseRating: [
              {
                $group: {
                  _id: null,
                  average: { $avg: '$averageRating' },
                },
              },
            ],
            mostPopularCourse: [
              { $sort: { totalEnrollments: -1 } },
              { $limit: 1 },
              { $project: { courseSlug: 1, totalEnrollments: 1 } },
            ],
          },
        },
      ]);

      const result = platformAnalytics[0];

      if (!result) throw new NotFoundException('Analytics not found');

      await this.cache.set('platform_analytics', result);

      return {
        message: 'Platform analytics fetched successfully',
        data: {
          totalCourses: result.totalCourses[0]?.total || 0,
          totalEnrollments: result.totalEnrollments[0]?.total || 0,
          totalRevenue: result.totalRevenue[0]?.total || 0,
          totalRefunds: result.totalRefunds[0]?.total || 0,
          averageCourseRating:
            result.averageCourseRating[0]?.average || 0,
          mostPopularCourse:
            result.mostPopularCourse[0]?.courseSlug || null,
        },
      };
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new BadRequestException(error.message);
    }
  }

  async getCourseAnalytics(slug: string) {
    try {
      const cachedAnalytics = await this.cache.get(
        `course_analytics_${slug}`,
      );

      if (cachedAnalytics)
        return {
          message: 'Analytics fetched successfully',
          data: cachedAnalytics,
        };

      const courseAnalytics = await this.Analytics.findOne({
        courseSlug: slug,
      });

      if (!courseAnalytics)
        throw new NotFoundException('Analytics not found');

      await this.cache.set(
        `course_analytics_${slug}`,
        courseAnalytics,
      );

      return {
        message: 'Course analytics fetched successfully',
        data: courseAnalytics,
      };
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new BadRequestException(error.message);
    }
  }
}
