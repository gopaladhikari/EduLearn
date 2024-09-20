import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { env } from "../../config/env";

const adminSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
    },

    phoneNumber: {
      type: String,
      required: true,
    },

    password: {
      type: String,
    },
  },
  { timestamps: true }
);

adminSchema.pre("save", async function (next) {
  if (this.password && this.isModified("password"))
    this.password = await bcrypt.hash(this.password, 10);

  next();
});

adminSchema.methods.comparePassword = async function (password: string) {
  return bcrypt.compare(password, this.password);
};

adminSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    {
      _id: this._id,
      email: this.email,
      fullName: this.fullName,
    },
    env.jwtSecret,
    {
      expiresIn: "7d",
    }
  );
  return token;
};

export const Admin = mongoose.model("Admin", adminSchema);
