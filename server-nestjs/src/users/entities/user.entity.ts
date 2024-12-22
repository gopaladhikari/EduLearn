import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import type { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User> & {
  comparePassword: (password: string) => boolean;
};

@Schema({
  timestamps: true,
})
export class User {
  @Prop({ required: true })
  fullName: string;

  @Prop({ required: true, unique: true, index: true })
  email: string;

  @Prop({ required: true, unique: true, index: true })
  phoneNumber: string;

  @Prop()
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
