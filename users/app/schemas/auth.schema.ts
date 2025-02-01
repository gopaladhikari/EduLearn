import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, {
    message: "Password is required",
  }),
});

export const registerSchema = z.object({
  fullName: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(8),
});

export const confirmForgotPasswordSchema = z.object({
  email: z.string().email(),
  password: z.string(),
  confirmPassword: z.string(),
});

export const resetPasswordSchema = z.object({
  oldPassword: z.string(),
  newPassword: z.string(),
  confirmPassword: z.string(),
});

export const verifyEmailSchema = z.object({
  email: z.string().email(),
});

export const forgotPasswordSchema = z.object({
  email: z.string().email(),
});

export const updatePasswordSchema = z.object({
  oldPassword: z.string(),
  newPassword: z.string(),
  confirmPassword: z.string(),
});

export type LoginSchema = z.infer<typeof loginSchema>;
export type RegisterSchema = z.infer<typeof registerSchema>;
export type ConfirmForgotPasswordSchema = z.infer<
  typeof confirmForgotPasswordSchema
>;
export type ResetPasswordSchema = z.infer<typeof resetPasswordSchema>;
export type VerifyEmailSchema = z.infer<typeof verifyEmailSchema>;
export type ForgotPasswordSchema = z.infer<
  typeof forgotPasswordSchema
>;
export type UpdatePasswordSchema = z.infer<
  typeof updatePasswordSchema
>;
