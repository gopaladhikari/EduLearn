import z from "zod";

export const userSchema = z.object({
  name: z.string({
    required_error: "Name is required",
    invalid_type_error: "Name must be a string",
  }),
  email: z
    .string({
      required_error: "Email is required",
      invalid_type_error: "Email must be a string",
    })
    .email("Invalid email"),
  mobileno: z.string({
    required_error: "Mobileno is required",
    invalid_type_error: "Mobileno must be a string",
  }),
});

export const userDetailsSchema = z.object({
  universityName: z.string({
    required_error: "University name is required",
    invalid_type_error: "University name must be a string",
  }),

  currentlyPursuing: z.string({
    required_error: "Currently pursuing is required",
    invalid_type_error: "Currently pursuing must be a string",
  }),

  semester: z.number({
    required_error: "Semester is required",
    invalid_type_error: "Semester must be a number",
  }),

  subject: z
    .string({
      required_error: "Subject is required",
      invalid_type_error: "Subject must be a string",
    })
    .array(),
});
