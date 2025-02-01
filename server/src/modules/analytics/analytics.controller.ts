import {
  Controller,
  Post,
  Param,
  UseGuards,
  Get,
} from '@nestjs/common';
import { AnalyticsService } from './analytics.service';
import { JwtGuard } from '../auth/guards/jwt-auth.guard';

@Controller('analytics')
@UseGuards(JwtGuard)
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Get('/platform')
  getPlatformAnalytics() {
    return this.analyticsService.getPlatformAnalytics();
  }

  @Get('/course/:slug')
  getCourseAnalytics(@Param('slug') slug: string) {
    return this.analyticsService.getCourseAnalytics(slug);
  }

  @Post('total-clicks/:slug')
  incrementTotalClicks(@Param('slug') slug: string) {
    return this.analyticsService.incrementTotalClicks(slug);
  }
}
