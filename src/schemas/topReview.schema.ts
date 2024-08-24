import z from "zod";

export const updateReviewSchema = z.object({
  review: z.string({
    required_error: "Review is required",
  }),
  rating: z.number({
    required_error: "Rating is required",
  }),
});

export const createReviewSchema = updateReviewSchema.merge(
  z.object({
    userId: z.string({
      required_error: "userId is required",
    }),

    courseId: z.string({
      required_error: "Email is required",
    }),

    userName: z.string({
      required_error: "Name is required",
    }),
  })
);
