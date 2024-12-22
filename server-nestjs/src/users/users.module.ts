import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UserSchema, User } from './entities/user.entity';
import { compare, hash, genSalt } from 'bcrypt';

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
            password: string,
          ): Promise<boolean> {
            const isEqual = await compare(password, this.password);
            return isEqual;
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
