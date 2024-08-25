import z from "zod";

export const updateReviewSchema = z.object({
  review: z.string({
    required_error: "Review is required",
    invalid_type_error: "Review must be a string",
  }),
  rating: z.number({
    required_error: "Rating is required",
    invalid_type_error: "Rating must be a number",
  }),
});

export const createReviewSchema = updateReviewSchema.merge(
  z.object({
    userId: z.string({
      required_error: "userId is required",
      invalid_type_error: "userId must be a string",
    }),

    courseId: z.string({
      required_error: "Email is required",
      invalid_type_error: "Email must be a string",
    }),

    userName: z.string({
      required_error: "Name is required",
      invalid_type_error: "Name must be a string",
    }),
  })
);
