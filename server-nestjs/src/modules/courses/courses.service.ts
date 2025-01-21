import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Course } from './entities/course.entity';
import type { Model } from 'mongoose';
import { v2 as cloudinary } from 'cloudinary';
import { ConfigService } from '@nestjs/config';
import type { UserDocument } from '../users/entities/user.entity';
import * as fs from 'fs';
import * as path from 'path';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import type { Cache } from 'cache-manager';

@Injectable()
export class CoursesService {
  private readonly cloudinary = cloudinary;

  constructor(
    @Inject(CACHE_MANAGER) private readonly cache: Cache,
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
            folder: 'EduLearn/courses',
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
      await this.cache.clear();

      return course;
    } catch (error) {
      throw new BadRequestException(error.message);
    } finally {
      fs.unlinkSync(localFilePath);
    }
  }

  async getAllCourses(limit: number, skip: number) {
    try {
      const cachedCourses = await this.cache.get('courses');

      if (cachedCourses) return cachedCourses;

      const courses = await this.Course.find()
        .limit(limit)
        .skip(skip);

      if (!courses) throw new NotFoundException('Course not found');

      await this.cache.set('courses', courses);
      return courses;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;

      throw new BadRequestException(error.message);
    }
  }

  async getCourseBySlug(slug: string) {
    try {
      const cacheKey = `course_slug_${slug}`;

      const cachedCourse = this.cache.get(cacheKey);

      if (cachedCourse) return cachedCourse;

      const course = await this.Course.findOne({
        slug: slug,
      }).populate({
        path: 'instructor',
        select: ['-password'],
      });

      if (!course) throw new NotFoundException('Course not found');

      await this.cache.set(cacheKey, course);

      return course;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;

      throw new BadRequestException(error.message);
    }
  }

  async getCourseAnalytics(slug: string) {
    try {
      const cacheKey = `course_analytics_${slug}`;

      const cachedCourseAnalytics = this.cache.get(cacheKey);

      if (cachedCourseAnalytics) return cachedCourseAnalytics;
      const course = await this.Course.aggregate([
        {
          $match: {
            slug: slug,
          },
        },
        {
          $lookup: {
            from: 'courseanalytics',
            localField: 'slug',
            foreignField: 'courseSlug',
            as: 'analytics',
          },
        },
        {
          $unwind: '$analytics',
        },
      ]);
      if (!course.length)
        throw new NotFoundException('Course not found');

      await this.cache.set(cacheKey, course.at(0));
      return course.at(0);
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new BadRequestException(error.message);
    }
  }

  async searchCourses(q: string, limit: number, skip: number) {
    try {
      const cacheKey = `courses_search_${q}_${limit}_${skip}`;

      const cachedCourses = this.cache.get(cacheKey);

      if (cachedCourses) return cachedCourses;

      const courses = await this.Course.find({
        $or: [
          {
            title: {
              $regex: q.trim(),
              $options: 'i',
            },
          },
          {
            description: {
              $regex: q,
              $options: 'i',
            },
          },
        ],
      })
        .limit(limit)
        .skip(skip);

      if (!courses.length)
        throw new NotFoundException('Course not found');

      await this.cache.set(cacheKey, courses);
      return courses;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new BadRequestException(error.message);
    }
  }

  async toggleCoursePublish(id: string) {
    try {
      const course = await this.Course.findById(id);

      if (!course) throw new NotFoundException('Course not found');

      if (course.isPublished) course.isPublished = false;
      else course.isPublished = true;

      await course.save();

      const cacheKey = `course_slug_${course.slug}`;

      await this.cache.del(cacheKey);

      return course;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new BadRequestException(error.message);
    }
  }

  async deleteById(id: string) {
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

      await this.cache.clear();

      return null;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new BadRequestException(error.message);
    }
  }

  async deleteManyById(ids: string[]) {
    try {
      const courses = await this.Course.find({
        _id: { $in: ids },
      });

      if (!courses.length)
        throw new NotFoundException('Course not found');

      const videoIds = courses.map((course) => course.video.publicId);

      const cloudinaryResponse =
        await this.cloudinary.api.delete_resources(videoIds, {
          resource_type: 'video',
          type: 'upload',
        });

      if (cloudinaryResponse.deleted) {
        const failedDeletes = Object.entries(
          cloudinaryResponse.deleted,
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
        ).filter(([_x, status]) => status !== 'deleted');

        if (failedDeletes.length) {
          throw new Error(
            `Failed to delete some videos: ${failedDeletes.map(([id]) => id).join(', ')}`,
          );
        }
      }

      const result = await this.Course.deleteMany({
        _id: { $in: ids },
      });

      if (!result.deletedCount)
        throw new NotFoundException('Course not found');

      await this.cache.clear();
      return null;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new BadRequestException(error.message);
    }
  }
}
