import type { User } from "./user.t";

export interface InstructorApplication {
  _id: string;
  user: User;
  motivation: string;
  experienceYears: number;
  expertise: string[];
  qualification: string;
  status: string;
  rejectionReason?: string;
  socialLinks: {
    youtube: string;
    linkedin: string;
    website: string;
    _id: string;
  };
  createdAt: string;
  updatedAt: string;
  __v: number;
}
