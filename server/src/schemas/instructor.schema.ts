import z from "zod";

export const createInstructorSchema = z.object({
  name: z.string().min(3).max(50),
  bio: z.string().min(3).max(500).optional(),
  socialLinks: z
    .object({
      linkedin: z.string().min(3).max(50).optional(),
      twitter: z.string().min(3).max(50).optional(),
    })
    .optional(),
  hiredOn: z.string().date().optional(),
});

export const updateInstructorSchema = createInstructorSchema.extend({
  firedOn: z.string().date().optional(),
  name: z.string().min(3).max(50).optional(),
});
