import type { Courselevels } from "@/utils/constants.js";
import type { HydratedDocument, Types } from "mongoose";
import type { ILectures } from "./lectures.t.js";

export interface ICourses {
  title: string;
  description: string;
  thumbnail: {
    publicId: string;
    url: string;
  };
  price: number;
  instructor: Types.ObjectId;
  coInstructors: Types.ObjectId[];
  lectures: HydratedDocument<ILectures>;
  isPublished: boolean;
  language: string;
  category: string;
  duration: number;
  subtitle?: string;
  level: Courselevels;
  slug: string;
}
