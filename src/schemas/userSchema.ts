import z from "zod";

export const userSchema = z.object({
  name: z.string({
    required_error: "Name is required",
  }),
  email: z
    .string({
      required_error: "Email is required",
    })
    .email("Invalid email"),
  mobileno: z
    .string({
      required_error: "Mobileno is required",
    })
    .min(10, "Invalid mobileno"),
});

export const userDetailsSchema = z.object({
  name: z.string({
    required_error: "Name is required",
  }),
  email: z
    .string({
      required_error: "Email is required",
    })
    .email("Invalid email"),
  mobileno: z
    .string({
      required_error: "Mobileno is required",
    })
    .min(10, "Invalid mobileno"),
});
