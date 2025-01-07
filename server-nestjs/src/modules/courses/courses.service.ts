import {
  ForbiddenException,
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
        slug: createCourseDto.title,
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
        course.video = {
          url: result.url,
          publicId: result.public_id,
        };
      }

      await course.save();

      return course;
    } catch (error) {
      throw new Error(error.message);
    } finally {
      fs.unlinkSync(localFilePath);
    }
  }

  async getAllCourses(user: UserDocument) {
    let courses: Course[];
    try {
      if (user.role === 'admin') courses = await this.Course.find();
      else if (user.role === 'user')
        courses = await this.Course.find({
          isPublished: true,
        });
      else throw new ForbiddenException('You are not authorized');

      if (!courses.length)
        throw new NotFoundException('Course not found');

      return courses;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      if (error instanceof ForbiddenException) throw error;

      throw new Error(error.message);
    }
  }

  async getCourseBySlug(slug: string) {
    try {
      const course = await this.Course.findOne({
        slug: slug,
      }).populate({
        path: 'instructor',
        select: ['-password'],
      });

      if (!course) throw new NotFoundException('Course not found');

      return course;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;

      throw new Error(error.message);
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} course`;
  }

  update(id: number, updateCourseDto: UpdateCourseDto) {
    console.log(updateCourseDto);
    return `This action updates a #${id} course`;
  }

  async toggleCoursePublish(id: string) {
    try {
      const course = await this.Course.findById(id);

      if (!course) throw new NotFoundException('Course not found');

      if (course.isPublished) course.isPublished = false;
      else course.isPublished = true;

      await course.save();

      return course;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new Error(error.message);
    }
  }

  async remove(id: string) {
    try {
      const deletedCourse = await this.Course.findByIdAndDelete(id);

      if (!deletedCourse)
        throw new NotFoundException('Course not found');

      await this.cloudinary.api.delete_resources(
        [deletedCourse.video.publicId.toString()],
        {
          resource_type: 'video',
          type: 'upload',
        },
      );

      return null;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new Error(error.message);
    }
  }
}
