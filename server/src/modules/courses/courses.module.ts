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
              const baseSlug = slugify(this.title, {
                lower: true,
                strict: true,
                replacement: '-',
              });

              let uniqueSlug = baseSlug;
              let count = 1;
              let existingCourse: string;

              do {
                existingCourse = await this.model(
                  Course.name,
                ).findOne({
                  slug: uniqueSlug,
                });
                if (existingCourse) {
                  uniqueSlug = `${baseSlug}-${count}`;
                  count++;
                }
              } while (existingCourse);

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
                // Regenerate slug and retry save
                const baseSlug = slugify(doc.title, {
                  lower: true,
                  strict: true,
                  replacement: '-',
                });

                let uniqueSlug = baseSlug;
                let count = 1;
                let existingCourse;

                do {
                  existingCourse = await doc.constructor.findOne({
                    slug: uniqueSlug,
                  });
                  if (existingCourse) {
                    uniqueSlug = `${baseSlug}-${count}`;
                    count++;
                  }
                } while (existingCourse);

                doc.slug = uniqueSlug;
                return doc.save();
              }
            }
            next(error);
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
