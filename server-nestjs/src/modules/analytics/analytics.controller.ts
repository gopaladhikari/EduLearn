import { Controller, Post, Param, UseGuards } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';
import { JwtGuard } from '../auth/guards/jwt-auth.guard';

@Controller('analytics')
@UseGuards(JwtGuard)
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Post('total-clicks/:slug')
  incrementTotalClicks(@Param('slug') slug: string) {
    return this.analyticsService.incrementTotalClicks(slug);
  }
}
