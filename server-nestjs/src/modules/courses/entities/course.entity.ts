import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import type { HydratedDocument } from 'mongoose';
import mongoose from 'mongoose';
import type { User } from 'src/modules/users/entities/user.entity';

export enum CourseCategory {
  // Technology and Development
  WebDevelopment = 'Web Development',
  MobileDevelopment = 'Mobile Development',
  ProgrammingLanguages = 'Programming Languages',
  SoftwareDevelopment = 'Software Development',
  ArtificialIntelligence = 'Artificial Intelligence & Machine Learning',
  DataScience = 'Data Science',
  Cybersecurity = 'Cybersecurity',
  CloudComputing = 'Cloud Computing',
  Blockchain = 'Blockchain & Cryptography',

  // Business and Management
  Entrepreneurship = 'Entrepreneurship',
  Leadership = 'Leadership',
  Marketing = 'Marketing',
  Finance = 'Finance',
  ProjectManagement = 'Project Management',
  HumanResources = 'Human Resources',
  Sales = 'Sales',

  // Creative Arts and Design
  GraphicDesign = 'Graphic Design',
  UIUXDesign = 'UI/UX Design',
  Animation = 'Animation and Motion Graphics',
  VideoEditing = 'Video Editing',
  Photography = 'Photography',
  Writing = 'Writing',

  // Personal Development
  Productivity = 'Productivity',
  Communication = 'Communication',
  Mindfulness = 'Mindfulness and Well-being',
  CareerDevelopment = 'Career Development',

  // Education and Teaching
  LanguageLearning = 'Language Learning',
  TeachingSkills = 'Teaching Skills',
  TestPreparation = 'Test Preparation',

  // Science and Mathematics
  Mathematics = 'Mathematics',
  Physics = 'Physics',
  Biology = 'Biology',
  Chemistry = 'Chemistry',
  Engineering = 'Engineering',

  // Health and Fitness
  Nutrition = 'Nutrition',
  Fitness = 'Fitness',
  MentalHealth = 'Mental Health',
  Sports = 'Sports',

  // Arts and Music
  Music = 'Music',
  PerformingArts = 'Performing Arts',
  FineArts = 'Fine Arts',
  Crafts = 'Crafts',

  // Social Sciences
  History = 'History',
  Psychology = 'Psychology',
  Sociology = 'Sociology',
  PoliticalScience = 'Political Science',

  // Miscellaneous
  Gaming = 'Gaming',
  CookingAndBaking = 'Cooking and Baking',
  PetCare = 'Pet Care',
  TravelAndAdventure = 'Travel and Adventure',
  Hobbies = 'Hobbies',
}

export type CourseDocument = HydratedDocument<Course>;

@Schema({ timestamps: true })
export class Course {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true, unique: true })
  slug: string;

  @Prop({
    required: true,
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  })
  instructor: User[];

  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  })
  uploadedBy: User;

  @Prop()
  lessons: string[];

  @Prop({
    required: true,
    enum: CourseCategory,
  })
  category: CourseCategory;

  @Prop({ required: true })
  tags: string[];

  @Prop({ required: true, default: 0 })
  price: number;

  @Prop()
  isPopular: boolean;

  @Prop()
  isBestSeller: boolean;

  @Prop()
  video: string;
}

export const CourseSchema = SchemaFactory.createForClass(Course);
