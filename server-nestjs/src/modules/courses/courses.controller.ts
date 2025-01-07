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
  UploadedFile,
  ValidationPipe,
  BadRequestException,
} from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { JwtGuard } from '../auth/guards/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { CurrentUser } from '../auth/current-user.decorator';
import type { UserDocument } from '../users/entities/user.entity';
import { isValidObjectId } from 'mongoose';

@Controller('courses')
@UseGuards(JwtGuard)
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Get()
  getAllCourses(@CurrentUser() user: UserDocument) {
    return this.coursesService.getAllCourses(user);
  }

  @Get(':slug')
  findOne(@Param('slug') slug: string) {
    return this.coursesService.getCourseBySlug(slug);
  }
  @Post()
  @UseInterceptors(FileInterceptor('video'))
  createCourse(
    @Body(ValidationPipe) createCourseDto: CreateCourseDto,
    @CurrentUser() user: UserDocument,
    @UploadedFile() video: Express.Multer.File,
  ) {
    if (user.role !== 'admin')
      throw new ForbiddenException(
        'You are not authorized to create a course',
      );

    if (!video) throw new BadRequestException('Video is required');

    return this.coursesService.createCourse(
      user,
      video,
      createCourseDto,
    );
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCourseDto: UpdateCourseDto,
  ) {
    return this.coursesService.update(+id, updateCourseDto);
  }

  @Patch('publish/:id')
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
