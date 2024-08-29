import z from "zod";

export const transactionSchema = z.object({
  amount: z.number({
    required_error: "Amount is required",
  }),
  transactionType: z.string({
    required_error: "Transaction type is required",
  }),
  description: z.string({
    required_error: "Description is required",
  }),
});
