import z from "zod";

const semesterSchema = z.object({
  semester: z.string({
    required_error: "Semester is required",
    invalid_type_error: "Semester must be a string",
  }),

  subjects: z
    .string({
      required_error: "Subject is required",
      invalid_type_error: "Subject must be a string",
    })
    .array(),
});

// Zod schema for the currentPursuing
const currentPursuingSchema = z.object({
  universityId: z.string({
    required_error: "University id is required",
    invalid_type_error: "University id must be a string",
  }),

  currentPursuingCourse: z.string({
    required_error: "Current pursuing course is required",
    invalid_type_error: "Current pursuing course must be a string",
  }),
  semesters: z.array(semesterSchema),
});

export { currentPursuingSchema };
