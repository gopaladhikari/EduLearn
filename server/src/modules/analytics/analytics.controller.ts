import {
  Controller,
  Post,
  Param,
  UseGuards,
  Get,
} from '@nestjs/common';
import { AnalyticsService } from './analytics.service';
import { JwtGuard } from '../auth/guards/jwt-auth.guard';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiSecurity,
} from '@nestjs/swagger';
import {
  CourseAnalyticsDto,
  PlatformAnalyticsDto,
  TotalClicksDto,
} from './dto/example-analytics.dto';

@ApiTags('Analytics')
@ApiSecurity('x-api-key')
@ApiBearerAuth()
@Controller('analytics')
@Controller('analytics')
@UseGuards(JwtGuard)
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Get('/platform')
  @ApiOperation({
    summary: 'Get Platform Analytics',
    description:
      'Fetches aggregated analytics data for the entire platform including total courses, enrollments, revenue, refunds, average course rating, and the most popular course.',
  })
  @ApiResponse({
    status: 200,
    description: 'Platform analytics fetched successfully.',
    type: PlatformAnalyticsDto,
  })
  getPlatformAnalytics() {
    return this.analyticsService.getPlatformAnalytics();
  }

  @Get('/course/:slug')
  @ApiOperation({
    summary: 'Get Course Analytics',
    description:
      'Fetches detailed analytics data for a specific course identified by its slug. Data includes enrollments, clicks, completions, average progress, revenue, reviews, and more.',
  })
  @ApiParam({
    name: 'slug',
    description: 'Unique course slug',
    example: 'introduction-to-nestjs',
  })
  @ApiResponse({
    status: 200,
    description: 'Course analytics fetched successfully.',
    type: CourseAnalyticsDto,
  })
  getCourseAnalytics(@Param('slug') slug: string) {
    return this.analyticsService.getCourseAnalytics(slug);
  }

  @Post('total-clicks/:slug')
  @ApiOperation({
    summary: 'Increment Total Clicks',
    description:
      'Increments the total clicks counter for the analytics record of a specific course. This endpoint updates the clicks metric and returns the updated analytics record.',
  })
  @ApiParam({
    name: 'slug',
    description: 'Unique course slug',
    example: 'introduction-to-nestjs',
  })
  @ApiResponse({
    status: 200,
    description: 'Analytics updated successfully.',
    type: TotalClicksDto,
  })
  incrementTotalClicks(@Param('slug') slug: string) {
    return this.analyticsService.incrementTotalClicks(slug);
  }
}
