import z from "zod";

export const lessonSchema = z.object({
  courseId: z.string({
    required_error: "CourseId is required",
    invalid_type_error: "CourseId must be a string",
  }),

  lessonTitle: z.string({
    required_error: "LessonTitle is required",
    invalid_type_error: "LessonTitle must be a string",
  }),

  lessonDuration: z.string({
    required_error: "LessonDuration is required",
    invalid_type_error: "LessonDuration must be a string",
  }),

  isPaid: z.boolean({
    required_error: "IsPaid is required",
    invalid_type_error: "IsPaid must be a boolean",
  }),
});
