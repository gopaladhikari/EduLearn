import type { CookieOptions } from "express";

export const appName = "edulearn";

export const clientUrl = "https://edulearn.gopuadks.dev";

export const cookiesOptions: CookieOptions = {
  httpOnly: true,
  secure: true,
  maxAge: 1 * 24 * 60 * 60 * 1000,
  sameSite: "lax",
};

export enum UserRoles {
  ADMIN = "admin",
  INSTRUCTOR = "instructor",
  STUDENT = "student",
}

export enum Courselevels {
  BEGINNER = "beginner",
  INTERMEDIATE = "intermediate",
  ADVANCED = "advanced",
}

export enum Rating {
  ONE = 1,
  TWO,
  THREE,
  FOUR,
  FIVE,
}

export enum paymentStatus {
  PENDING = "pending",
  COMPLETED = "completed",
  FAILED = "failed",
  REFUNDED = "refunded",
}

export enum paymentMethods {
  STRIPE = "stripe",
  RAZORPAY = "razorpay",
  FREE = "free",
}

export enum gender {
  MALE = "male",
  FEMALE = "female",
}

export enum instructorApplicationStatus {
  PENDING = "pending",
  ACCEPTED = "accepted",
  REJECTED = "rejected",
}
