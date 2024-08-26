import mongoose, { InferSchemaType } from "mongoose";
import jwt from "jsonwebtoken";
import { env } from "../config/env";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    mobileno: {
      type: String,
      required: true,
      unique: true,
    },

    isMobileNoVerified: {
      type: Boolean,
      default: false,
    },

    jwtToken: {
      type: String,
    },

    otp: {
      type: Number,
    },

    otpExpiryDate: {
      type: Date,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    isEmailVerified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

userSchema.methods.generateJwtToken = function () {
  const payload = {
    id: this._id,
    name: this.name,
    email: this.email,
  };

  return jwt.sign(payload, env.jwtSecret);
};

export interface IUser extends InferSchemaType<typeof userSchema> {
  generateJwtToken(): string;
}

export const User = mongoose.model<IUser>("User", userSchema);
