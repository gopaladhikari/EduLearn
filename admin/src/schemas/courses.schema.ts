import { z } from "zod";

export enum CourseCategory {
  // Technology and Development
  WebDevelopment = "Web Development",
  MobileDevelopment = "Mobile Development",
  ProgrammingLanguages = "Programming Languages",
  SoftwareDevelopment = "Software Development",
  ArtificialIntelligence = "Artificial Intelligence & Machine Learning",
  DataScience = "Data Science",
  Cybersecurity = "Cybersecurity",
  CloudComputing = "Cloud Computing",
  Blockchain = "Blockchain & Cryptography",

  // Business and Management
  Entrepreneurship = "Entrepreneurship",
  Leadership = "Leadership",
  Marketing = "Marketing",
  Finance = "Finance",
  ProjectManagement = "Project Management",
  HumanResources = "Human Resources",
  Sales = "Sales",

  // Creative Arts and Design
  GraphicDesign = "Graphic Design",
  UIUXDesign = "UI/UX Design",
  Animation = "Animation and Motion Graphics",
  VideoEditing = "Video Editing",
  Photography = "Photography",
  Writing = "Writing",

  // Personal Development
  Productivity = "Productivity",
  Communication = "Communication",
  Mindfulness = "Mindfulness and Well-being",
  CareerDevelopment = "Career Development",

  // Education and Teaching
  LanguageLearning = "Language Learning",
  TeachingSkills = "Teaching Skills",
  TestPreparation = "Test Preparation",

  // Science and Mathematics
  Mathematics = "Mathematics",
  Physics = "Physics",
  Biology = "Biology",
  Chemistry = "Chemistry",
  Engineering = "Engineering",

  // Health and Fitness
  Nutrition = "Nutrition",
  Fitness = "Fitness",
  MentalHealth = "Mental Health",
  Sports = "Sports",

  // Arts and Music
  Music = "Music",
  PerformingArts = "Performing Arts",
  FineArts = "Fine Arts",
  Crafts = "Crafts",

  // Social Sciences
  History = "History",
  Psychology = "Psychology",
  Sociology = "Sociology",
  PoliticalScience = "Political Science",

  // Miscellaneous
  Gaming = "Gaming",
  CookingAndBaking = "Cooking and Baking",
  PetCare = "Pet Care",
  TravelAndAdventure = "Travel and Adventure",
  Hobbies = "Hobbies",
}

export const courseSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  instructor: z
    .array(z.string())
    .min(1, "At least one instructor is required"),
  price: z
    .string()
    .min(1, "Price is required")
    .transform((val) => z.coerce.number().parse(val)),
  video: z.instanceof(File).refine((file) => file.size > 0, {
    message: "The uploaded file must be a valid video format",
  }),
  thumbnail: z.instanceof(File).refine((file) => file.size > 0, {
    message: "The uploaded file must be a valid image format",
  }),
  category: z.nativeEnum(CourseCategory),
  tags: z.string().array().optional(),
});

export type CourseSchema = z.infer<typeof courseSchema>;
