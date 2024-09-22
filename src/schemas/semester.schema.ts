import z from "zod";

export const semesterSchema = z.object({
  name: z.string().min(2, "Invalid name"),
});
