import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import type { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({
  timestamps: true,
})
export class User {
  @Prop()
  fullName: string;

  @Prop({ required: true, unique: true, index: true })
  email: string;

  @Prop({ unique: true, index: true })
  phoneNumber: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true, enum: ['admin', 'user'] })
  role: 'admin' | 'user';

  @Prop()
  avatarUrl: string;

  @Prop()
  bio: string;

  @Prop()
  jwtToken: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
