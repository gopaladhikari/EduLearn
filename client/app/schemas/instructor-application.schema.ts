import { z } from "zod";

export const instructorApplicationSchema = z.object({
  motivation: z
    .string()
    .min(200, {
      message: "Motivation must be at least 200 characters",
    })
    .max(800, {
      message: "Motivation must be at most 800 characters",
    }),
  experienceYears: z
    .number()
    .min(0, {
      message: "Experience years must be at least 0",
    })
    .max(30, {
      message: "Experience years must be at most 30",
    }),
  expertise: z.array(z.string()).min(1, {
    message: "Expertise must have at least 1 item",
  }),
  qualification: z.string().min(1, {
    message: "Qualification must be at least 1 character",
  }),
  youtube: z.url().optional().or(z.literal("")),
  linkedin: z.url().optional().or(z.literal("")),
  website: z.url().optional().or(z.literal("")),
});

export type InstructorApplicationFormValues = z.infer<
  typeof instructorApplicationSchema
>;
