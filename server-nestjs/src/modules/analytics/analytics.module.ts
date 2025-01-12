import { Module } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';
import { AnalyticsController } from './analytics.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  CourseAnalytics,
  CourseAnalyticsSchema,
} from './entities/analytics.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: CourseAnalytics.name,
        schema: CourseAnalyticsSchema,
      },
    ]),
  ],
  controllers: [AnalyticsController],
  providers: [AnalyticsService],
})
export class AnalyticsModule {}
