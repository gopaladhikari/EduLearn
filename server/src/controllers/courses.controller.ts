import { Course } from "@/models/course.model.js";
import { ApiError, ApiResponse } from "@/utils/api-responses.js";
import { cloudinary } from "@/utils/cloudinary.js";
import { UserRoles } from "@/utils/constants.js";
import { cache } from "@/utils/redis.js";
import type { Request, Response } from "express";
import fs from "fs";

const CourseCache = {
  all: "course:all",
  byKey: (key: string) => `course:${key}`,
};

async function findAuthorizedCourse(courseId: string, user: Request["user"]) {
  const course = await Course.findById(courseId).populate(
    "instructor",
    "fullName avatar email"
  );

  if (!course) throw new ApiError(404, "Course not found");

  if (user?.role !== UserRoles.ADMIN && !course.instructor.equals(user!._id))
    throw new ApiError(403, "Not authorized.");

  return course;
}

export const getCourses = async (_req: Request, res: Response) => {
  const cachedCourses = await cache.get(CourseCache.all);

  if (cachedCourses)
    return res.status(200).json(
      new ApiResponse(200, "Courses fetched successfully", {
        courses: cachedCourses,
      })
    );

  const courses = await Course.find().populate(
    "instructor",
    "fullName avatar email"
  );

  if (courses.length === 0) throw new ApiError(404, "No courses found");

  void cache.set(CourseCache.all, courses);

  return res.json(
    new ApiResponse(200, "Courses fetched successfully", {
      courses,
    })
  );
};

export const getCourseById = async (req: Request, res: Response) => {
  const courseId = req.params.courseId as string;

  const cachedCourse = await cache.get(CourseCache.byKey(courseId));

  if (cachedCourse)
    return res.status(200).json(
      new ApiResponse(200, "Course fetched", {
        course: cachedCourse,
      })
    );

  const course = await Course.findById(courseId).populate(
    "instructor",
    "fullName avatar email"
  );

  if (!course) throw new ApiError(400, "Course not found");

  void cache.set(CourseCache.byKey(courseId), course);

  return res.status(200).json(
    new ApiResponse(200, "Course fetched successfully", {
      course,
    })
  );
};

export const createCourse = async (req: Request, res: Response) => {
  const thumbnailPath = req.file?.path;

  try {
    const result = await cloudinary.upload(thumbnailPath!);

    if (!result) throw new ApiError(500, "Failed to upload thumbnail");

    const createdCourse = await Course.create({
      ...req.body,
      instructor: req.user?._id,
      thumbnail: {
        publicId: result?.public_id,
        url: result?.secure_url,
      },
    });

    if (!createdCourse) throw new ApiError(500, "Failed to create course");

    res.status(201).json(
      new ApiResponse(201, "Course created successfully", {
        course: createdCourse,
      })
    );

    void Promise.all([
      cache.set(CourseCache.byKey(createdCourse._id.toString()), createdCourse),
      cache.del(CourseCache.all),
    ]);
  } finally {
    if (thumbnailPath && fs.existsSync(thumbnailPath))
      fs.unlinkSync(thumbnailPath);
  }
};

export const updateCourseById = async (req: Request, res: Response) => {
  const courseId = req.params.courseId as string;

  const course = await findAuthorizedCourse(courseId, req.user!);

  course.set(req.body);

  const updatedCourse = await course.save();

  if (!updatedCourse) throw new ApiError(500, "Failed to update course");

  res.status(200).json(
    new ApiResponse(200, "Course updated successfully", {
      course: updatedCourse,
    })
  );

  void Promise.all([
    cache.set(CourseCache.byKey(updatedCourse._id.toString()), updatedCourse),
    cache.del(CourseCache.all),
  ]);
};

export const deleteCourseById = async (req: Request, res: Response) => {
  const courseId = req.params.courseId as string;

  await findAuthorizedCourse(courseId, req.user!);

  const deletedCourse = await Course.findByIdAndDelete(courseId);

  if (!deletedCourse) throw new ApiError(500, "Failed to delete course");

  res.status(200).json(
    new ApiResponse(200, "Course deleted successfully", {
      course: deletedCourse,
    })
  );

  void Promise.all([
    cache.del(CourseCache.byKey(courseId)),
    cache.del(CourseCache.all),
  ]);
};

export const publishCourseById = async (req: Request, res: Response) => {
  const courseId = req.params.courseId as string;

  await findAuthorizedCourse(courseId, req.user!);

  const publishedCourse = await Course.findByIdAndUpdate(
    courseId,
    {
      $set: { isPublished: true },
    },
    {
      runValidators: true,
      new: true,
    }
  );

  if (!publishedCourse) throw new ApiError(500, "Failed to publish course");

  res.status(200).json(
    new ApiResponse(200, "Course published successfully", {
      course: publishedCourse,
    })
  );

  void Promise.all([
    cache.set(CourseCache.byKey(courseId), publishedCourse),
    cache.del(CourseCache.all),
  ]);
};

export const draftCourseById = async (req: Request, res: Response) => {
  const courseId = req.params.courseId as string;

  await findAuthorizedCourse(courseId, req.user!);

  const publishedCourse = await Course.findByIdAndUpdate(
    courseId,
    {
      $set: { isPublished: false },
    },
    {
      runValidators: true,
      new: true,
    }
  );

  if (!publishedCourse) throw new ApiError(500, "Failed to draft course");

  res.status(200).json(
    new ApiResponse(200, "Course drafted successfully", {
      course: publishedCourse,
    })
  );

  void Promise.all([
    cache.set(CourseCache.byKey(courseId), publishedCourse),
    cache.del(CourseCache.all),
  ]);
};
