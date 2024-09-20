import z from "zod";

export const createUniversitySchema = z.object({
  universityName: z.string().min(2, "Invalid university name"),
});
