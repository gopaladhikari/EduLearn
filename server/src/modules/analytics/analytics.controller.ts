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
import { AnalyticsSwagger } from 'src/config/constants/analytics.swagger';

@ApiTags('Analytics')
@ApiSecurity('x-api-key')
@ApiBearerAuth()
@Controller('analytics')
@UseGuards(JwtGuard)
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Get('/platform')
  @ApiOperation(AnalyticsSwagger.getPlatformAnalytics.operation)
  @ApiResponse(AnalyticsSwagger.getPlatformAnalytics.okResponse)
  getPlatformAnalytics() {
    return this.analyticsService.getPlatformAnalytics();
  }

  @Get('/course/:slug')
  @ApiOperation(AnalyticsSwagger.getCourseAnalytics.operation)
  @ApiParam(AnalyticsSwagger.getCourseAnalytics.param)
  @ApiResponse(AnalyticsSwagger.getCourseAnalytics.okResponse)
  getCourseAnalytics(@Param('slug') slug: string) {
    return this.analyticsService.getCourseAnalytics(slug);
  }

  @Post('total-clicks/:slug')
  @ApiOperation(AnalyticsSwagger.incrementTotalClicks.operation)
  @ApiParam(AnalyticsSwagger.incrementTotalClicks.param)
  @ApiResponse(AnalyticsSwagger.incrementTotalClicks.okResponse)
  incrementTotalClicks(@Param('slug') slug: string) {
    return this.analyticsService.incrementTotalClicks(slug);
  }
}
