import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import type { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

export enum Role {
  Admin = 'admin',
  User = 'user',
}

export enum Status {
  Active = 'active',
  Restrcited = 'restrcited',
  Inactive = 'inactive',
}

export enum AuthProvider {
  Local = 'local',
  Google = 'google',
  Facebook = 'facebook',
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

  @Prop()
  password: string;

  @Prop({ required: true, enum: Role })
  role: Role;

  @Prop({ required: true, default: false })
  verified: boolean;

  @Prop({
    required: true,
    default: Status.Active,
    enum: Status,
  })
  status: Status;

  @Prop({
    enum: AuthProvider,
    default: AuthProvider.Local,
  })
  provider: AuthProvider;

  @Prop({ required: false })
  providerId: string;

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
