import { z } from "zod";

export const reviewSchema = z.discriminatedUnion("status", [
  z.object({
    status: z.literal("accepted"),
    rejectionReason: z.string().optional().or(z.literal("")),
  }),
  z.object({
    status: z.literal("rejected"),
    rejectionReason: z
      .string()
      .min(20, "Rejection reason must be between 20 to 200 character long.")
      .max(200, "Rejection reason must be between 20 to 200 character long."),
  }),
]);

export type ReviewFormValues = z.infer<typeof reviewSchema>;
