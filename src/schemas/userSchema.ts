import z from "zod";

export const userSchema = z.object({
  fullName: z.string().min(2, "Invalid full name"),
  email: z.string().email("Invalid email"),
  phoneNumber: z
    .string()
    .min(10, "Invalid phone number")
    .max(10, "Invalid phone number"),
});

export const userDetailsSchema = z.object({
  universityName: z.string().min(2, "Invalid university name"),

  currentlyPursuing: z.string().min(2, "Invalid subject"),

  semester: z.number().min(1, "Invalid semester"),

  subject: z.string().min(2, "Invalid subject").array(),
});

export const userSchemaWithPassword = userSchema.extend({
  password: z.string().min(6, "Invalid password"),
});
