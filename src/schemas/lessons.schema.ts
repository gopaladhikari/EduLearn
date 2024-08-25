import z from "zod";

export const lessonSchema = z.object({
  courseId: z.string({
    required_error: "CourseId is required",
  }),

  lessonTitle: z.string({
    required_error: "LessonTitle is required",
  }),

  lessonDuration: z.string({
    required_error: "LessonDuration is required",
  }),

  isPaid: z.boolean({
    required_error: "IsPaid is required",
  }),
});
