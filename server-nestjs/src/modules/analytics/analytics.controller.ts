import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ForbiddenException,
} from '@nestjs/common';
import { AnalyticsService } from './analytics.service';
import { UpdateAnalyticsDto } from './dto/update-analytics.dto';
import { JwtGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/current-user.decorator';
import type { UserDocument } from '../users/entities/user.entity';

@Controller('analytics')
@UseGuards(JwtGuard)
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Get(':slug')
  getAnalytics(
    @Param('slug') slug: string,
    @CurrentUser() user: UserDocument,
  ) {
    if (user.role !== 'admin')
      throw new ForbiddenException(
        'You are not authorized to view analytics',
      );
    return this.analyticsService.getAnalytics(slug);
  }

  @Post('total-clicks/:slug')
  incrementTotalClicks(@Param('slug') slug: string) {
    return this.analyticsService.incrementTotalClicks(slug);
  }

  @Get()
  findAll() {
    return this.analyticsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.analyticsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAnalyticsDto: UpdateAnalyticsDto,
  ) {
    return this.analyticsService.update(+id, updateAnalyticsDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.analyticsService.remove(+id);
  }
}
