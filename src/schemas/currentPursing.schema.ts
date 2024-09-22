import z from "zod";

export const createCurrentPursuingSchema = z.object({
  name: z.string().min(2, "Invalid name"),
  universityId: z.string().min(1, "Invalid university id"),
});

export const updateCurrentPursuingSchema = z.object({
  name: z.string().min(2, "Invalid name").optional(),
  universityId: z.string().min(1, "Invalid university id").optional(),
});
