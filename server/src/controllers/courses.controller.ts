import { Course } from "@/models/course.model.js";
import { ApiError, ApiResponse } from "@/utils/api-responses.js";
import { cache } from "@/utils/redis.js";
import type { Request, Response } from "express";
import { isValidObjectId } from "mongoose";

function courseKey(id: string) {
  return `course:${id}`;
}

export const getCourses = async (_req: Request, res: Response) => {
  const courses = await Course.aggregate([]);

  res.json(courses);
};

export const getCourseById = async (req: Request, res: Response) => {
  const courseId = req.params.courseId as string;

  if (!isValidObjectId(courseId)) throw new ApiError(400, "Invalid course id");

  const cachedCourse = await cache.get(courseKey(courseId));

  if (cachedCourse)
    return res.status(200).json(
      new ApiResponse(200, "Course fetched", {
        course: cachedCourse,
      })
    );

  const course = await Course.findById(courseId);

  if (!course) throw new ApiError(400, "Course not found");

  void cache.set(courseKey(courseId), course);

  return res.status(200).json(
    new ApiResponse(200, "Course fetched successfully", {
      course,
    })
  );
};
