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
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiQuery,
  ApiParam,
  ApiBody,
  ApiConsumes,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiBadRequestResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiSecurity,
} from '@nestjs/swagger';
import { Course } from './entities/course.entity';

@ApiTags('Courses')
@ApiSecurity('x-api-key')
@ApiBearerAuth('JWT-auth')
@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Get()
  @ApiOperation({ summary: 'Get paginated list of all courses' })
  @ApiQuery({
    name: 'limit',
    type: Number,
    example: 10,
    required: false,
  })
  @ApiQuery({
    name: 'skip',
    type: Number,
    example: 0,
    required: false,
  })
  @ApiOkResponse({
    description: 'List of courses retrieved successfully',
    type: [Course],
  })
  getAllCourses(
    @Query('limit') limit: number,
    @Query('skip') skip: number,
  ) {
    return this.coursesService.getAllCourses(limit, skip);
  }

  @Get('/search')
  @ApiOperation({ summary: 'Search courses by title or description' })
  @ApiQuery({
    name: 'q',
    description: 'Search query',
    example: 'web development',
  })
  @ApiQuery({ name: 'limit', type: Number, example: 10 })
  @ApiQuery({ name: 'skip', type: Number, example: 0 })
  @ApiOkResponse({
    description: 'Search results matching query',
    type: [Course],
  })
  searchCourses(
    @Query('q') q: string,
    @Query('limit') limit: number,
    @Query('skip') skip: number,
  ) {
    return this.coursesService.searchCourses(q, limit, skip);
  }

  @Get(':slug')
  @ApiOperation({ summary: 'Get course details by slug' })
  @ApiParam({
    name: 'slug',
    example: 'introduction-to-web-development',
  })
  @ApiOkResponse({
    description: 'Course details retrieved successfully',
    type: Course,
  })
  @ApiNotFoundResponse({ description: 'Course not found' })
  getCourseBySlug(@Param('slug') slug: string) {
    return this.coursesService.getCourseBySlug(slug);
  }

  @Post()
  @UseGuards(JwtGuard)
  @ApiOperation({ summary: 'Create a new course (Admin only)' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Course data with video and thumbnail files',
  })
  @ApiCreatedResponse({
    description: 'Course created successfully',
    type: Course,
  })
  @ApiBadRequestResponse({
    description: 'Invalid file format or missing fields',
  })
  @ApiForbiddenResponse({ description: 'Admin access required' })
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
  @UseGuards(JwtGuard)
  @ApiOperation({
    summary: 'Toggle course publish status (Admin only)',
  })
  @ApiParam({
    name: 'id',
    description: 'MongoDB ObjectID',
    example: '65f8d7e4c4b5d12a5c3e4f5a',
  })
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
  @ApiOperation({ summary: 'Delete multiple courses (Admin only)' })
  @ApiBody({
    description: 'Array of course IDs to delete',
    schema: {
      example: {
        ids: ['65f8d7e4c4b5d12a5c3e4f5a', '65f8d7e4c4b5d12a5c3e4f5b'],
      },
    },
  })
  @ApiOkResponse({ description: 'Courses deleted successfully' })
  @ApiBadRequestResponse({ description: 'Invalid IDs provided' })
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
  @ApiOperation({ summary: 'Delete a course (Admin only)' })
  @ApiParam({ name: 'id', description: 'MongoDB ObjectID' })
  @ApiOkResponse({ description: 'Course deleted successfully' })
  @ApiNotFoundResponse({ description: 'Course not found' })
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
