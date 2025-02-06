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
    files: {
      video?: Express.Multer.File[];
      thumbnail?: Express.Multer.File[];
    },
    createCourseDto: CreateCourseDto,
  ) {
    const localVideoPath = path.join(
      process.cwd(),
      files.video[0].path,
    );
    const localThumbnailPath = path.join(
      process.cwd(),
      files.thumbnail[0].path,
    );

    try {
      if (
        fs.existsSync(localVideoPath) &&
        fs.existsSync(localThumbnailPath)
      ) {
        const videoResult = await this.cloudinary.uploader.upload(
          localVideoPath,
          {
            resource_type: 'auto',
            type: 'upload',
            folder: 'EduLearn/videos',
            transformation: {
              quality: 'auto',
              fetch_format: 'auto',
            },
            eager_async: true,
          },
        );

        const thumbnailResult = await this.cloudinary.uploader.upload(
          localThumbnailPath,
          {
            resource_type: 'auto',
            type: 'upload',
            folder: 'EduLearn/thumbnails',
            transformation: {
              quality: 'auto',
              fetch_format: 'auto',
            },
            eager_async: true,
          },
        );

        const createdCourse = await this.Course.create({
          title: createCourseDto.title,
          description: createCourseDto.description,
          category: createCourseDto.category,
          price: createCourseDto.price,
          instructor: user._id,
          video: {
            url: videoResult.url,
            publicId: videoResult.public_id,
          },
          thumbnail: {
            url: thumbnailResult.url,
            publicId: thumbnailResult.public_id,
          },
          tags: createCourseDto.tags,
          isPublished: false,
          uploadedBy: user._id,
        });

        return {
          message: 'Course created successfully',
          data: createdCourse,
        };
      } else
        throw new BadRequestException('Video or thumbnail not found');
    } catch (error) {
      console.log(error);
      throw new BadRequestException(error.message);
    } finally {
      if (fs.existsSync(localVideoPath))
        fs.unlinkSync(localVideoPath);

      if (fs.existsSync(localThumbnailPath))
        fs.unlinkSync(localThumbnailPath);
    }
  }

  async getAllCourses(limit: number, skip: number) {
    try {
      const cachedCourses = await this.cache.get('courses');

      if (cachedCourses)
        return {
          message: 'Courses fetched successfully',
          data: cachedCourses,
        };

      const courses = await this.Course.find({})
        .limit(limit)
        .skip(skip);

      if (!courses.length)
        throw new NotFoundException('Course not found');

      await this.cache.set('courses', courses);
      return {
        message: 'Courses fetched successfully',
        data: courses,
      };
    } catch (error) {
      if (error instanceof NotFoundException) throw error;

      throw new BadRequestException(error.message);
    }
  }

  async getCourseBySlug(slug: string) {
    try {
      const cacheKey = `course_slug_${slug}`;

      const cachedCourse = await this.cache.get(cacheKey);

      if (cachedCourse)
        return {
          message: 'Course fetched successfully',
          data: cachedCourse,
        };

      const course = await this.Course.findOne({
        slug: slug,
      }).populate({
        path: 'instructor',
        select: ['-password'],
      });

      if (!course) throw new NotFoundException('Course not found');

      await this.cache.set(cacheKey, course);

      return {
        message: 'Course fetched successfully',
        data: course,
      };
    } catch (error) {
      if (error instanceof NotFoundException) throw error;

      throw new BadRequestException(error.message);
    }
  }

  async searchCourses(q: string, limit: number, skip: number) {
    try {
      const cacheKey = `courses_search_${q}_${limit}_${skip}`;

      const cachedCourses = await this.cache.get(cacheKey);

      if (cachedCourses)
        return {
          message: 'Courses fetched successfully',
          data: cachedCourses,
        };

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
      return {
        message: 'Courses fetched successfully',
        data: courses,
      };
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

      return {
        message: 'Course published successfully',
        data: course,
      };
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

      return {
        message: 'Course deleted successfully',
        data: null,
      };
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
      return {
        message: 'Courses deleted successfully',
        data: null,
      };
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new BadRequestException(error.message);
    }
  }
}
