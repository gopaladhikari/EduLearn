import { z } from "zod";

export const courseSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  instructor: z.string().min(1, "Instructor name is required"),
  price: z.number().min(1, "Price is required"),
  video: z.instanceof(File).refine((file) => file.size > 0, {
    message: "The uploaded file must be a valid video format",
  }),
  tags: z
    .array(z.string())
    .min(1, "At least one tag is required")
    .optional(),
});

export type CourseSchema = z.infer<typeof courseSchema>;
