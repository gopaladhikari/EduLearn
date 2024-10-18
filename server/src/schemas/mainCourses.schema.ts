import { z } from "zod";

export const mainCourseSchema = z.object({
  courseType: z.string({
    required_error: "Course type is required!",
    invalid_type_error: "Course type must be a string!",
  }),

  coursePursuing: z.string({
    required_error: "Course pursuing information is required!",
    invalid_type_error: "Course pursuing must be a string!",
  }),

  semester: z.string({
    required_error: "Semester is required!",
    invalid_type_error: "Semester must be a string!",
  }),

  subject: z.string({
    required_error: "Subject is required!",
    invalid_type_error: "Subject must be a string!",
  }),

  universityName: z.string({
    required_error: "University name is required!",
    invalid_type_error: "University name must be a string!",
  }),

  totalClasses: z.string({
    required_error: "Total classes are required!",
    invalid_type_error: "Total classes must be a string!",
  }),

  duration: z.string({
    required_error: "Duration is required!",
    invalid_type_error: "Duration must be a string!",
  }),

  price: z.number({
    required_error: "Price is required!",
    invalid_type_error: "Price must be a number!",
  }),

  rating: z.number({
    required_error: "Rating is required!",
    invalid_type_error: "Rating must be a number!",
  }),

  courseDetails: z.object({
    about: z.string({
      required_error: "Course details about section is required!",
      invalid_type_error: "About must be a string!",
    }),

    curriculcum: z.string({
      required_error: "Curriculum details are required!",
      invalid_type_error: "Curriculum must be a string!",
    }),
  }),

  instructor: z.object({
    instructorName: z.string({
      required_error: "Instructor name is required!",
      invalid_type_error: "Instructor name must be a string!",
    }),

    instructorImage: z
      .string({
        invalid_type_error: "Instructor image must be a string!",
      })
      .optional(),

    instructorDesignation: z.string({
      required_error: "Instructor designation is required!",
      invalid_type_error: "Instructor designation must be a string!",
    }),
  }),

  lessonsVideos: z.array(
    z.string({
      required_error: "Lesson ID is required!",
      invalid_type_error: "Lesson ID must be a string!",
    })
  ),
});
