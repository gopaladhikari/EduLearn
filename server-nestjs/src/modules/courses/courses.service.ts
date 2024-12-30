import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Course } from './entities/course.entity';
import type { Model } from 'mongoose';
import { v2 as cloudinary } from 'cloudinary';
import { ConfigService } from '@nestjs/config';
import type { UserDocument } from '../users/entities/user.entity';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class CoursesService {
  private readonly cloudinary = cloudinary;

  constructor(
    @InjectModel(Course.name)
    private readonly Course: Model<Course>,
    private readonly config: ConfigService,
  ) {
    this.cloudinary.config({
      cloud_name: this.config.getOrThrow('CLOUDINARY_CLOUD_NAME'),
      api_key: this.config.getOrThrow('CLOUDINARY_API_KEY'),
      api_secret: this.config.getOrThrow('CLOUDINARY_API_SECRET'),
    });
  }

  async createCourse(
    user: UserDocument,
    video: Express.Multer.File,
    createCourseDto: CreateCourseDto,
  ) {
    const localFilePath = path.join(process.cwd(), video.path);

    try {
      const course = new this.Course({
        ...createCourseDto,
        uploadedBy: user._id,
      });

      if (video && fs.existsSync(localFilePath)) {
        const result = await this.cloudinary.uploader.upload(
          localFilePath,
          {
            resource_type: 'video',
            folder: 'e-learning/courses',
            transformation: {
              quality: 'auto',
              fetch_format: 'auto',
            },
            eager_async: true,
          },
        );

        course.video = result.url;
      }

      await course.save();

      return course;
    } catch (error) {
      throw new BadRequestException(error.message);
    } finally {
      fs.unlinkSync(localFilePath);
    }
  }

  async getAllCourses() {
    try {
      const courses = await this.Course.find().populate({
        path: 'uploadedBy',
        select: ['fullName', 'email'],
      });

      if (!courses.length)
        throw new NotFoundException('No course found');

      return courses;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;

      throw new BadRequestException(error.message);
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} course`;
  }

  update(id: number, updateCourseDto: UpdateCourseDto) {
    return `This action updates a #${id} course`;
  }

  remove(id: number) {
    return `This action removes a #${id} course`;
  }
}
