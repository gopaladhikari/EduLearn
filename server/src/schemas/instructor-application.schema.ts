import { instructorApplicationStatus } from "@/utils/constants.js";
import { z } from "zod";

export const instructorApplicationSchema = z.object({
  motivation: z.string().min(200).max(800),
  experienceYears: z.number().min(0).max(30),
  expertise: z.array(z.string()).min(1),
  qualification: z.string().min(1),
  youtube: z.url().optional().or(z.literal("")),
  linkedin: z.url().optional().or(z.literal("")),
  website: z.url().optional().or(z.literal("")),
});

export const updateInstructorApplicationSchema = z.discriminatedUnion(
  "status",
  [
    z.object({
      status: z.literal(instructorApplicationStatus.ACCEPTED),
      rejectionReason: z.string().optional().or(z.literal("")),
    }),
    z.object({
      status: z.literal(instructorApplicationStatus.REJECTED),
      rejectionReason: z
        .string()
        .min(10, "Rejection reason must be at least 10 characters"),
    }),
  ]
);
