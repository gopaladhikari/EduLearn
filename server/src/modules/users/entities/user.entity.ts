import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import type { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

export enum Role {
  Admin = 'admin',
  User = 'user',
}

@Schema({
  timestamps: true,
})
export class User {
  @Prop()
  fullName: string;

  @Prop({ required: true, unique: true, index: true })
  email: string;

  @Prop({ unique: true, index: true, sparse: true })
  username: string;

  @Prop({ unique: true, index: true, sparse: true })
  phoneNumber: number;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true, enum: Role })
  role: 'admin' | 'user';

  @Prop({ required: true, default: false })
  verified: boolean;

  @Prop({
    required: true,
    default: 'active',
    enum: ['active', 'restrcited', 'inactive'],
  })
  status: 'active' | 'restrcited' | 'inactive';

  @Prop({
    type: {
      url: String,
      publicId: String,
    },
  })
  avatar: {
    url: string;
    publicId: string;
  };

  @Prop()
  bio: string;

  @Prop()
  jwtToken: string;

  @Prop()
  forgotPasswordToken: string;

  @Prop()
  forgotPasswordTokenExpires: Date;

  @Prop()
  resetPasswordToken: string;

  @Prop()
  resetPasswordTokenExpires: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
