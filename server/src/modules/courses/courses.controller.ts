import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  ForbiddenException,
  ValidationPipe,
  BadRequestException,
  Query,
  UploadedFiles,
} from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { JwtGuard } from '../auth/guards/jwt-auth.guard';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { CurrentUser } from '../auth/current-user.decorator';
import { isValidObjectId } from 'mongoose';
import type { UserDocument } from '../users/entities/user.entity';

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Get()
  getAllCourses(
    @Query('limit') limit: number,
    @Query('skip') skip: number,
  ) {
    return this.coursesService.getAllCourses(limit, skip);
  }

  @Get('/search')
  searchCourses(
    @Query('q') q: string,
    @Query('limit') limit: number,
    @Query('skip') skip: number,
  ) {
    return this.coursesService.searchCourses(q, limit, skip);
  }

  @Get(':slug')
  getCourseBySlug(@Param('slug') slug: string) {
    return this.coursesService.getCourseBySlug(slug);
  }

  @Post()
  @UseGuards(JwtGuard)
  @UseInterceptors(
    FileFieldsInterceptor([
      {
        name: 'video',
        maxCount: 1,
      },
      {
        name: 'thumbnail',
        maxCount: 1,
      },
    ]),
  )
  createCourse(
    @Body(ValidationPipe) createCourseDto: CreateCourseDto,
    @CurrentUser() user: UserDocument,
    @UploadedFiles()
    files: {
      video?: Express.Multer.File[];
      thumbnail?: Express.Multer.File[];
    },
  ) {
    if (user.role !== 'admin')
      throw new ForbiddenException(
        'You are not authorized to create a course',
      );

    if (!files.video || !files.thumbnail)
      throw new BadRequestException(
        'Both video and thumbnail are required',
      );

    return this.coursesService.createCourse(
      user,
      files,
      createCourseDto,
    );
  }

  @Patch('publish/:id')
  @UseGuards(JwtGuard)
  toggleCoursePublish(
    @Param('id') id: string,
    @CurrentUser() user: UserDocument,
  ) {
    if (user.role !== 'admin')
      throw new ForbiddenException(
        'You are not authorized to publish a course',
      );

    if (!isValidObjectId(id))
      throw new BadRequestException('Invalid id');

    return this.coursesService.toggleCoursePublish(id);
  }

  @Delete('bulk')
  @UseGuards(JwtGuard)
  removeAll(
    @CurrentUser() user: UserDocument,
    @Body('ids') ids: string[],
  ) {
    if (user.role !== 'admin')
      throw new ForbiddenException(
        'You are not authorized to delete a course',
      );

    if (!ids.length)
      throw new BadRequestException('No course ids provided');

    return this.coursesService.deleteManyById(ids);
  }

  @Delete(':id')
  @UseGuards(JwtGuard)
  remove(@Param('id') id: string, @CurrentUser() user: UserDocument) {
    if (user.role !== 'admin')
      throw new ForbiddenException(
        'You are not authorized to delete a course',
      );

    if (!isValidObjectId(id))
      throw new BadRequestException('Invalid id');

    return this.coursesService.deleteById(id);
  }
}
