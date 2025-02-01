import z from "zod";

export const confirmPasswordSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(8, {
      message: "Password must be at least 8 characters",
    }),
    confirmPassword: z.string().min(8, {
      message: "Confirm password must be at least 8 characters",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
  });

export type ConfirmPasswordSchema = z.infer<typeof confirmPasswordSchema>;
