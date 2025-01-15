import { z } from "zod";

export const registerSchema = z.object({
  fullName: z.string(),
  email: z.string().email(),
  password: z.string().min(8),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const forgotPasswordSchema = z.object({
  email: z.string().email(),
});

export const resetPasswordSchema = z.object({
  password: z.string().min(6).max(20),
});

export type RegisterSchema = z.infer<typeof registerSchema>;
export type LoginSchema = z.infer<typeof loginSchema>;
export type ForgotPasswordSchema = z.infer<
  typeof forgotPasswordSchema
>;
export type ResetPasswordSchema = z.infer<typeof resetPasswordSchema>;
