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
  universityId: z.string().min(2, "Invalid university ID"),
  currentPursuingId: z.string().min(1, "Invalid current pursuing ID"),
  semesterId: z.string().min(1, "Invalid semester ID"),
  subjectIds: z.string().min(1, "Invalid semester ID").array(),
});
