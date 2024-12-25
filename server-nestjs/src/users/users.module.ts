import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UserSchema, User } from './entities/user.entity';
import { hash, genSalt, compare } from 'bcrypt';

@Module({
  imports: [
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

          schema.methods.comparePassword = async function (
            candidatePassword: string,
          ) {
            const isPasswordValid = await compare(
              candidatePassword,
              this.password,
            );

            return isPasswordValid;
          };

          return schema;
        },
      },
    ]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
