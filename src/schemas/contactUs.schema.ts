import z from "zod";

export const contactUsSchema = z.object({
  name: z
    .string({
      required_error: "Name is required",
    })
    .min(3, { message: "Name must be at least 3 characters" }),
  email: z
    .string({
      required_error: "Email is required",
    })
    .email("Invalid email"),
  issue: z.string({
    required_error: "Issue is required",
  }),
});
