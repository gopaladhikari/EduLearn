import mongoose, { InferSchemaType } from "mongoose";
import bcrypt from "bcryptjs";
import { env } from "../../config/env";
import jwt from "jsonwebtoken";

const customerSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },

    phoneNumber: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    isPhoneNumberVerified: {
      type: Boolean,
      default: false,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    isEmailVerified: {
      type: Boolean,
      default: false,
    },

    password: {
      type: String,
    },

    emailVerificationToken: {
      type: String,
    },

    emailVerificationExpiryDate: {
      type: Date,
      default: Date.now() + 1000 * 60 * 60 * 24 * 7, // 7 days
    },
  },
  {
    timestamps: true,
  }
);

customerSchema.pre("save", async function (next) {
  if (this.password && this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

customerSchema.methods.comparePassword = async function (
  password: string
) {
  return bcrypt.compare(password, this.password);
};

customerSchema.methods.generateAuthToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      fullName: this.fullName,
      role: "customer",
    },
    env.jwtSecret,
    {
      expiresIn: "7d",
    }
  );
};

export interface Customer extends InferSchemaType<typeof customerSchema> {
  generateJwtToken: () => string;
}

export const Customer = mongoose.model<Customer>(
  "Customer",
  customerSchema
);
