import type {
  ApiOperationOptions,
  ApiParamOptions,
  ApiResponseOptions,
} from '@nestjs/swagger';
import {
  CourseAnalyticsDto,
  PlatformAnalyticsDto,
  TotalClicksDto,
} from 'src/modules/analytics/dto/example-analytics.dto';

export const AnalyticsSwagger = {
  getPlatformAnalytics: {
    operation: {
      summary: 'Get Platform Analytics',
      description:
        'Fetches aggregated analytics data for the entire platform including total courses, enrollments, revenue, refunds, average course rating, and the most popular course.',
    } as ApiOperationOptions,
    okResponse: {
      status: 200,
      description: 'Platform analytics fetched successfully.',
      type: PlatformAnalyticsDto,
    } as ApiResponseOptions,
  },

  getCourseAnalytics: {
    operation: {
      summary: 'Get Course Analytics',
      description:
        'Fetches detailed analytics data for a specific course identified by its slug. Data includes enrollments, clicks, completions, average progress, revenue, reviews, and more.',
    } as ApiOperationOptions,
    param: {
      name: 'slug',
      description: 'Unique course slug',
      example: 'introduction-to-nestjs',
    } as ApiParamOptions,
    okResponse: {
      status: 200,
      description: 'Course analytics fetched successfully.',
      type: CourseAnalyticsDto,
    } as ApiResponseOptions,
  },

  incrementTotalClicks: {
    operation: {
      summary: 'Increment Total Clicks',
      description:
        'Increments the total clicks counter for the analytics record of a specific course. This endpoint updates the clicks metric and returns the updated analytics record.',
    } as ApiOperationOptions,
    param: {
      name: 'slug',
      description: 'Unique course slug',
      example: 'introduction-to-nestjs',
    } as ApiParamOptions,
    okResponse: {
      status: 200,
      description: 'Analytics updated successfully.',
      type: TotalClicksDto,
    } as ApiResponseOptions,
  },
} as const;
