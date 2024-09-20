import z from "zod";

export const loginSchema = z.object({
  phoneNumber: z
    .string()
    // .regex(/^\+91[6-9]\d{9}$/, "Invalid phone number format")
    .min(13, "Invalid phone number")
    .max(13, "Invalid phone number"),
});

export const registerSchema = loginSchema.extend({
  fullName: z.string().min(2, "Invalid full name"),
  email: z.string().email("Invalid email"),
});

export const userDetailsSchema = z.object({
  universityName: z.string().min(2, "Invalid university name"),

  currentlyPursuing: z.string().min(2, "Invalid subject"),

  semester: z.number().min(1, "Invalid semester"),

  subject: z.string().min(2, "Invalid subject").array(),
});
