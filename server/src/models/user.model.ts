import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import jwt, { type SignOptions } from "jsonwebtoken";
import type { IUsers } from "@/types/users.t.js";
import { UserRoles } from "@/utils/constants.js";

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET as string;
const accessTokenExpiry = process.env.ACCESS_TOKEN_EXPIRY;
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET as string;
const refreshTokenExpiry = process.env.REFRESH_TOKEN_EXPIRY;

const userSchema = new Schema<IUsers>(
  {
    username: {
      type: String,
      required: [true, "Username is required."],
      minLength: [6, "Your username should be between 6 and 20 characters."],
      maxLength: [20, "Your username should be between 6 and 20 characters."],
      unique: [true, "This username is taken. Try another."],
      lowercase: true,
      trim: true,
      index: true,
    },

    email: {
      type: String,
      required: [true, "Email is required."],
      unique: [true, "This email is taken, Try another."],
      lowercase: true,
      trim: true,
      index: true,
      match: [
        /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
        "Please provide a valid email address",
      ],
    },

    role: {
      type: String,
      enum: {
        values: Object.values(UserRoles),
        message: "Invalid user role.",
      },
      default: UserRoles.STUDENT,
      required: [true, "Role is required."],
    },

    password: {
      type: String,
      minLength: [8, "Password must be at least 8 characters."],
      select: false,
      required: [true, "Please provide a password."],
    },

    isEmailVerified: {
      type: Boolean,
      default: false,
    },

    refreshToken: {
      type: String,
      select: false,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function () {
  if (this.password && this.isModified("password"))
    this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.isPasswordValid = async function (password: string) {
  const isMatch = await bcrypt.compare(password, this.password);

  return isMatch;
};

userSchema.methods.generateAccessToken = function () {
  const payload = { _id: this._id };

  return jwt.sign(payload, accessTokenSecret, {
    expiresIn: accessTokenExpiry as NonNullable<SignOptions["expiresIn"]>,
  });
};

userSchema.methods.generateRefreshToken = function () {
  const payload = { _id: this._id };

  return jwt.sign(payload, refreshTokenSecret, {
    expiresIn: refreshTokenExpiry as NonNullable<SignOptions["expiresIn"]>,
  });
};

userSchema.methods.generateToken = function () {
  const unhashedToken = crypto.randomBytes(64).toString("hex");

  const hashToken = crypto
    .createHash("sha256")
    .update(unhashedToken)
    .digest("hex");

  const tokenExpiry = Date.now() + 20 * 60 * 1000; // 20 minutes

  return {
    unhashedToken,
    hashToken,
    tokenExpiry,
  };
};

export const User = model("User", userSchema);
