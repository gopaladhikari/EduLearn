import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAnalyticsDto } from './dto/create-analytics.dto';
import { UpdateAnalyticsDto } from './dto/update-analytics.dto';
import { InjectModel } from '@nestjs/mongoose';
import type { Model } from 'mongoose';
import { CourseAnalytics } from './entities/analytics.entity';

@Injectable()
export class AnalyticsService {
  constructor(
    @InjectModel(CourseAnalytics.name)
    private readonly Analytics: Model<CourseAnalytics>,
  ) {}

  async getAnalytics(slug: string) {
    try {
      const analytics = await this.Analytics.findOne({
        courseSlug: slug,
      });
      if (!analytics)
        throw new NotFoundException('No analytics found');
      return analytics;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new Error('Internal server error');
    }
  }

  create(createAnalyticsDto: CreateAnalyticsDto) {
    return 'This action adds a new analytics';
  }

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
      console.log(error);
      throw error;
    }
  }

  findAll() {
    return `This action returns all analytics`;
  }

  findOne(id: number) {
    return `This action returns a #${id} analytics`;
  }

  update(id: number, updateAnalyticsDto: UpdateAnalyticsDto) {
    return `This action updates a #${id} analytics`;
  }

  remove(id: number) {
    return `This action removes a #${id} analytics`;
  }
}
