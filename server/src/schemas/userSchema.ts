import z from "zod";

export const loginSchema = z.object({
  phoneNumber: z.string().regex(/^\d{10}$/, {
    message: "Invalid phone number",
  }),
});

export const registerSchema = loginSchema.extend({
  fullName: z.string().min(2, "Invalid full name"),
  email: z.string().email("Invalid email"),
});
