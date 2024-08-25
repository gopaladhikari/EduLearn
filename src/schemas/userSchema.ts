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
  userId: z.string({
    required_error: "User id is required",
  }),

  universityName: z.string({
    required_error: "University name is required",
  }),

  currentlyPursuing: z.string({
    required_error: "Currently pursuing is required",
  }),

  semester: z.number({
    required_error: "Semester is required",
  }),

  subject: z
    .string({
      required_error: "Subject is required",
      invalid_type_error: "Invalid subject",
    })
    .array(),
});
