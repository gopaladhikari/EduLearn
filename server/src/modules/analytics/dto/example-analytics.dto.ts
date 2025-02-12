import { ApiProperty } from '@nestjs/swagger';

export class PlatformAnalyticsDto {
  @ApiProperty({ example: 50 })
  totalCourses: number;

  @ApiProperty({ example: 2000 })
  totalEnrollments: number;

  @ApiProperty({ example: 15000 })
  totalRevenue: number;

  @ApiProperty({ example: 100 })
  totalRefunds: number;

  @ApiProperty({ example: 4.5 })
  averageCourseRating: number;

  @ApiProperty({ example: 'introduction-to-nestjs' })
  mostPopularCourse: string;
}

export class CourseAnalyticsDto {
  @ApiProperty({ example: 'introduction-to-nestjs' })
  course: string;

  @ApiProperty({ example: 300 })
  totalEnrollments: number;

  @ApiProperty({ example: 1500 })
  totalClicks: number;

  @ApiProperty({ example: 250 })
  totalCompletions: number;

  @ApiProperty({ example: 75 })
  averageProgress: number;

  @ApiProperty({ example: 200 })
  activeUsers: number;

  @ApiProperty({ example: 5000 })
  totalRevenue: number;

  @ApiProperty({ example: 50 })
  discountedSales: number;

  @ApiProperty({ example: 5 })
  refunds: number;

  @ApiProperty({ example: 4.7 })
  averageRating: number;

  @ApiProperty({ example: 120 })
  totalReviews: number;

  @ApiProperty({ example: ['Great course', 'Very informative'] })
  commonFeedback: string[];

  @ApiProperty({ example: 'lesson-3' })
  mostViewedLesson: string;

  @ApiProperty({ example: 'lesson-3' })
  dropOffPoint: string;

  @ApiProperty({ example: 8000 })
  totalWatchTime: number;

  @ApiProperty({ example: 95 })
  popularityScore: number;

  @ApiProperty({ example: 85 })
  trendScore: number;
}

export class TotalClicksDto {
  @ApiProperty({ example: 'introduction-to-nestjs' })
  course: string;

  @ApiProperty({ example: 1501 })
  totalClicks: number;
}
