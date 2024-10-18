import z from "zod";

const librarySchema = z.object({
  userId: z.string({
    required_error: "User id is required",
    invalid_type_error: "User id must be a string",
  }),
  courseId: z.string({
    required_error: "Course id is required",
    invalid_type_error: "Course id must be a string",
  }),

  progress: z.number({
    required_error: "Progress is required",
    invalid_type_error: "Progress must be a number",
  }),
});

export { librarySchema };
