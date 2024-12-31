import { Module } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CoursesController } from './courses.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Course, CourseSchema } from './entities/course.entity';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import slugify from 'slugify';

@Module({
  imports: [
    MulterModule.register({
      storage: diskStorage({
        destination: './uploads/courses',
        filename: (req, file, cb) => {
          const fileName = Date.now() + '-' + file.originalname;
          cb(null, fileName);
        },
      }),
    }),
    MongooseModule.forFeatureAsync([
      {
        name: Course.name,
        useFactory: () => {
          const schema = CourseSchema;

          schema.pre('save', async function (next) {
            if (this.isModified('title')) {
              // Generate the base slug
              const baseSlug = slugify(this.title, {
                lower: true,
                strict: true,
                replacement: '-',
              });

              let uniqueSlug = baseSlug;
              let count = 1;

              while (
                await this.model(Course.name).findOne({
                  slug: uniqueSlug,
                })
              ) {
                uniqueSlug = `${baseSlug}-${count}`;
                count++;
              }

              this.slug = uniqueSlug;
            }

            next();
          });

          schema.post('save', async function (error, doc, next) {
            if (
              error.name === 'MongoServerError' &&
              error.code === 11000
            ) {
              if (error.keyPattern?.slug) {
                const baseSlug = slugify(this.title, {
                  lower: true,
                  strict: true,
                  replacement: '-',
                });

                let uniqueSlug = baseSlug;
                let count = 1;

                while (
                  await this.model(Course.name).findOne({
                    slug: uniqueSlug,
                  })
                ) {
                  uniqueSlug = `${baseSlug}-${count}`;
                  count++;
                }

                this.slug = uniqueSlug;
                await this.save();
              }
            } else next(error);
          });

          return schema;
        },
      },
    ]),
  ],
  controllers: [CoursesController],
  providers: [CoursesService],
})
export class CoursesModule {}
