import z from "zod";

export const createCurrentPursuingSchema = z.object({
  name: z.string().min(2, "Invalid Current Pursuing name"),
});
