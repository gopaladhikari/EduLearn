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
    userName: z.string({
      required_error: "Name is required",
      invalid_type_error: "Name must be a string",
    }),
  })
);
