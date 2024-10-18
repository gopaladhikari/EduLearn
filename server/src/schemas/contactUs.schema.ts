import z from "zod";

export const contactUsSchema = z.object({
  name: z
    .string({
      required_error: "Name is required",
      invalid_type_error: "Name must be a string",
    })
    .min(3, { message: "Name must be at least 3 characters" }),
  email: z
    .string({
      required_error: "Email is required",
      invalid_type_error: "Email must be a string",
    })
    .email("Invalid email"),
  issue: z.string({
    required_error: "Issue is required",
    invalid_type_error: "Issue must be a string",
  }),
});
