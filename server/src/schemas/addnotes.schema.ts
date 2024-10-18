import z from "zod";

export const addNotesSchema = z.object({
  note: z.string({
    required_error: "note is required",
    invalid_type_error: "note must be a string",
  }),
});
