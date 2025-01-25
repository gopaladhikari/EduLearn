import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UserSchema, User } from './entities/user.entity';
import { hash, genSalt } from 'bcrypt';
import { MailService } from '../mail/mail.service';
import { JwtModule } from '@nestjs/jwt';
import { diskStorage } from 'multer';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    MulterModule.register({
      storage: diskStorage({
        destination: './uploads/avatars',
        filename: (req, file, cb) => {
          const fileName = Date.now() + '-' + file.originalname;
          cb(null, fileName);
        },
      }),
    }),
    MongooseModule.forFeatureAsync([
      {
        name: User.name,
        useFactory: () => {
          const schema = UserSchema;

          schema.pre('save', async function (next) {
            if (this.password && this.isModified('password')) {
              const salt = await genSalt(10);
              this.password = await hash(this.password, salt);
            }
            next();
          });

          return schema;
        },
      },
    ]),
    JwtModule,
  ],
  controllers: [UsersController],
  providers: [UsersService, MailService],
  exports: [UsersService],
})
export class UsersModule {}
