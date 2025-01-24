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
  phoneNumber: z
    .string()
    .min(10, {
      message: "Phone number must be 10 digits.",
    })
    .max(15, {
      message: "Phone number must be 10 digits.",
    })
    .transform((value) => z.coerce.number().parse(value)),
});

export const bioSchema = z.object({
  bio: z.string().max(500, {
    message: "Bio must be less than 500 characters.",
  }),
});

export const avatarSchema = z
  .object({
    avatar: z.instanceof(File, {
      message: "Please select a file.",
    }),
  })
  .refine(({ avatar }) => avatar.size > 0, {
    message: "Please select an avatar.",
  });
