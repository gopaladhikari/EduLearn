import z from "zod";

export const semesterSchema = z.object({
  names: z.string().min(2, "Invalid semester name").array(),
});

export const updateSemesterSchema = z.object({
  name: z.string().min(2, "Invalid semester name"),
});
