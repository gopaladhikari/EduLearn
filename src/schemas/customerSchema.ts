import z from "zod";

export const loginSchema = z.object({
  phoneNumber: z
    .string()
    .min(13, "Invalid phone number")
    .max(13, "Invalid phone number"),
});

export const registerSchema = loginSchema.extend({
  fullName: z.string().min(2, "Invalid full name"),
  email: z.string().email("Invalid email"),
});

export const customerDetailsSchema = registerSchema.extend({
  password: z.string().min(6, "Invalid password"),
});
