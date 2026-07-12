import { z } from "zod";

export const reviewSchema = z.object({
  status: z.enum(["approved", "rejected"]),
  rejectionReason: z
    .string()
    .min(10, "Rejection reason must be at least 10 characters")
    .optional(),
});

export type ReviewFormValues = z.infer<typeof reviewSchema>;
