import { z } from "zod";

export const fullNameSchema = z.object({
  fullName: z.string().min(2, {
    message: "Full name must be at least 2 characters.",
  }),
});

export const emailSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
});

export const usernameSchema = z.object({
  username: z.string().min(3, {
    message: "Username must be at least 3 characters.",
  }),
});

export const phoneNumberSchema = z.object({
  phoneNumber: z.number().min(10, {
    message: "Phone number must be at least 10 digits.",
  }),
});

export const bioSchema = z.object({
  bio: z.string().max(500, {
    message: "Bio must be less than 500 characters.",
  }),
});

export const avatarUrlSchema = z.object({
  avatarUrl: z.string().url({
    message: "Please enter a valid URL.",
  }),
});
