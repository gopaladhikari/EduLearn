import { z } from "zod";
import { Courselevels } from "@/utils/constants.js";

const courseBaseSchema = {
  title: z
    .string()
    .min(1, "Course title is required")
    .max(100, "Course title cannot exceed 100 characters")
    .trim(),
  subtitle: z
    .string()
    .max(200, "Course subtitle cannot exceed 200 characters")
    .trim()
    .optional(),
  description: z
    .string()
    .min(1, "Course description is required")
    .max(500, "Course description cannot exceed 500 characters")
    .trim(),
  duration: z
    .number()
    .min(0, "Duration cannot be negative")
    .default(0)
    .optional(),
  category: z.string().min(1, "Category is required").trim(),
  level: z.enum(Courselevels).default(Courselevels.BEGINNER),
  price: z.number().min(0, "Course price cannot be negative"),
  language: z.string().min(1, "Course language is required"),
  thumbnail: z.file(),
  instructor: z.string().min(1, "Instructor is required"),
  coInstructors: z.array(z.string()).optional(),
  isPublished: z.boolean().default(false).optional(),
};

export const createCourseSchema = z.object({
  ...courseBaseSchema,
  title: courseBaseSchema.title,
  description: courseBaseSchema.description,
  category: courseBaseSchema.category,
  price: courseBaseSchema.price,
  language: courseBaseSchema.language,
  thumbnail: courseBaseSchema.thumbnail,
  instructor: courseBaseSchema.instructor,
});

export const updateCourseSchema = z.object({
  title: courseBaseSchema.title.optional(),
  subtitle: courseBaseSchema.subtitle,
  description: courseBaseSchema.description.optional(),
  duration: courseBaseSchema.duration,
  category: courseBaseSchema.category.optional(),
  level: courseBaseSchema.level.optional(),
  price: courseBaseSchema.price.optional(),
  language: courseBaseSchema.language.optional(),
  thumbnail: courseBaseSchema.thumbnail.optional(),
  instructor: courseBaseSchema.instructor.optional(),
  coInstructors: courseBaseSchema.coInstructors,
  isPublished: courseBaseSchema.isPublished,
});
