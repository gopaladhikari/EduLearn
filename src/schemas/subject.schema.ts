import z from "zod";

export const subjectSchema = z.object({
  name: z.string().min(2, "Invalid name"),
});
