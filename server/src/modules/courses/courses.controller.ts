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
import { isValidObjectId, type FilterQuery } from 'mongoose';
import {
  Role,
  type UserDocument,
} from '../users/entities/user.entity';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiQuery,
  ApiParam,
  ApiConsumes,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiBadRequestResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiSecurity,
} from '@nestjs/swagger';
import { CoursesSwagger } from 'src/config/constants/courses.swagger';
import {
  invalidMongodbId,
  USERS_MESSAGES,
} from 'src/config/messages';
import { DeleteCourseInBulkDto } from './dto/delete-course-in-bult.dto';
import type { Course } from './entities/course.entity';

@ApiSecurity('x-api-key')
@ApiBearerAuth('JWT-auth')
@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Get()
  @ApiOperation(CoursesSwagger.getAllCourses.operation)
  @ApiOkResponse(CoursesSwagger.getAllCourses.okResponse)
  @ApiQuery(CoursesSwagger.getAllCourses.query)
  getAllCourses(@Query() query: FilterQuery<Course>) {
    return this.coursesService.getAllCourses(query);
  }

  @Get('/search')
  @ApiOperation(CoursesSwagger.searchCourses.operation)
  @ApiQuery(CoursesSwagger.searchCourses.queryQ)
  @ApiQuery(CoursesSwagger.searchCourses.queryLimit)
  @ApiQuery(CoursesSwagger.searchCourses.querySkip)
  @ApiOkResponse(CoursesSwagger.searchCourses.okResponse)
  searchCourses(
    @Query('q') q?: string,
    @Query('limit') limit?: number,
    @Query('skip') skip?: number,
  ) {
    return this.coursesService.searchCourses(q, limit, skip);
  }

  @Get(':slug')
  @ApiOperation(CoursesSwagger.getCourseBySlug.operation)
  @ApiParam(CoursesSwagger.getCourseBySlug.paramSlug)
  @ApiOkResponse(CoursesSwagger.getCourseBySlug.okResponse)
  @ApiNotFoundResponse(
    CoursesSwagger.getCourseBySlug.notFoundResponse,
  )
  getCourseBySlug(@Param('slug') slug: string) {
    return this.coursesService.getCourseBySlug(slug);
  }

  @Post()
  @ApiOperation(CoursesSwagger.createCourse.operation)
  @ApiConsumes(CoursesSwagger.createCourse.consumes)
  @ApiCreatedResponse(CoursesSwagger.createCourse.createdResponse)
  @ApiBadRequestResponse(
    CoursesSwagger.createCourse.badRequestResponse,
  )
  @ApiForbiddenResponse(CoursesSwagger.createCourse.forbiddenResponse)
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
      throw new ForbiddenException(USERS_MESSAGES.FORBIDDEN);

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
  @ApiOperation(CoursesSwagger.toggleCoursePublish.operation)
  @ApiParam(CoursesSwagger.toggleCoursePublish.paramId)
  @ApiOkResponse(CoursesSwagger.toggleCoursePublish.okResponse)
  toggleCoursePublish(
    @Param('id') id: string,
    @CurrentUser() user: UserDocument,
  ) {
    if (user.role !== Role.Admin)
      throw new ForbiddenException(USERS_MESSAGES.FORBIDDEN);

    if (!isValidObjectId(id))
      throw new BadRequestException(invalidMongodbId);

    return this.coursesService.toggleCoursePublish(id);
  }

  @Delete('bulk')
  @UseGuards(JwtGuard)
  @ApiOperation(CoursesSwagger.removeAll.operation)
  @ApiOkResponse(CoursesSwagger.removeAll.okResponse)
  @ApiBadRequestResponse(CoursesSwagger.removeAll.badRequestResponse)
  removeAll(
    @CurrentUser() user: UserDocument,
    @Body(ValidationPipe)
    { ids }: DeleteCourseInBulkDto,
  ) {
    if (user.role !== 'admin')
      throw new ForbiddenException(USERS_MESSAGES.FORBIDDEN);

    return this.coursesService.deleteManyById(ids);
  }

  @Delete(':id')
  @UseGuards(JwtGuard)
  @ApiOperation(CoursesSwagger.remove.operation)
  @ApiOkResponse(CoursesSwagger.remove.okResponse)
  @ApiNotFoundResponse(CoursesSwagger.remove.notFoundResponse)
  remove(@Param('id') id: string, @CurrentUser() user: UserDocument) {
    if (user.role !== 'admin')
      throw new ForbiddenException(USERS_MESSAGES.FORBIDDEN);

    if (!isValidObjectId(id))
      throw new BadRequestException(invalidMongodbId);

    return this.coursesService.deleteById(id);
  }
}
