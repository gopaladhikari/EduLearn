import { z } from "zod";

export const courseSchema = z.object({
  subjectName: z.string({
    required_error: "Subject name is required",
    invalid_type_error: "Subject name must be a string",
  }),
});
