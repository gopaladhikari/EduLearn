import { Course } from "@/models/course.model.js";
import { ApiError, ApiResponse } from "@/utils/api-responses.js";
import { cloudinary } from "@/utils/cloudinary.js";
import { UserRoles } from "@/utils/constants.js";
import { cache } from "@/utils/redis.js";
import type { Request, Response } from "express";
import fs from "fs";

function courseKey(key: string) {
  return `course:${key}`;
}

export const getCourses = async (_req: Request, res: Response) => {
  const cachedCourses = await cache.get(courseKey("all"));

  if (cachedCourses)
    return res.status(200).json(
      new ApiResponse(200, "Courses fetched successfully", {
        courses: cachedCourses,
      })
    );

  const courses = await Course.find().populate("instructor");

  if (courses.length === 0) throw new ApiError(404, "No courses found");

  void cache.set(courseKey("all"), courses);

  return res.json(
    new ApiResponse(200, "Courses fetched successfully", {
      courses,
    })
  );
};

export const getCourseById = async (req: Request, res: Response) => {
  const courseId = req.params.courseId as string;

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

export const createCourse = async (req: Request, res: Response) => {
  const thumbnailPath = req.file?.path;

  try {
    const result = await cloudinary.upload(thumbnailPath!);

    if (!result) throw new ApiError(500, "Failed to upload thumbnail");

    const createdCourse = await Course.create({
      ...req.body,
      instructor: req.user?._id,
      thumbnail: {
        public_id: result?.public_id,
        secure_url: result?.secure_url,
      },
    });

    if (!createdCourse) throw new ApiError(500, "Failed to create course");

    void Promise.all([
      cache.set(courseKey(createdCourse._id.toString()), createdCourse),
      cache.del(courseKey("all")),
    ]);

    return res.status(201).json(
      new ApiResponse(201, "Course created successfully", {
        course: createdCourse,
      })
    );
  } catch (error) {
    throw error;
  } finally {
    if (thumbnailPath && fs.existsSync(thumbnailPath))
      fs.unlinkSync(thumbnailPath);
  }
};

export const updateCourseById = async (req: Request, res: Response) => {
  const courseId = req.params.courseId as string;

  const course = await Course.findById(courseId);

  if (!course) throw new ApiError(404, "Course not found");

  if (
    req.user?.role !== UserRoles.ADMIN &&
    !course.instructor.equals(req.user!._id)
  )
    throw new ApiError(403, "Not authorized.");

  const updatedCourse = await Course.findByIdAndUpdate(
    courseId,
    {
      $set: { ...req.body },
    },
    {
      new: true,
    }
  );

  if (!updatedCourse) throw new ApiError(500, "Failed to update course");

  void Promise.all([
    cache.set(courseKey(updatedCourse._id.toString()), updatedCourse),
    cache.del(courseKey("all")),
  ]);

  return res.status(200).json(
    new ApiResponse(200, "Course updated successfully", {
      course: updatedCourse,
    })
  );
};

export const deleteCourseById = async (req: Request, res: Response) => {
  const courseId = req.params.courseId as string;

  const course = await Course.findById(courseId);

  if (!course) throw new ApiError(404, "Course not found");

  if (
    req.user?.role !== UserRoles.ADMIN &&
    !course.instructor.equals(req.user!._id)
  ) {
    throw new ApiError(403, "Not authorized.");
  }

  const deletedCourse = await Course.findByIdAndDelete(courseId);

  if (!deletedCourse) throw new ApiError(500, "Failed to delete course");

  if (await cache.exists(courseKey(deletedCourse._id.toString())))
    void cache.del(courseKey(deletedCourse._id.toString()));

  return res.status(200).json(
    new ApiResponse(200, "Course deleted successfully", {
      course: deletedCourse,
    })
  );
};

export const publishCourseById = async (req: Request, res: Response) => {
  const courseId = req.params.courseId as string;

  const course = await Course.findById(courseId);

  if (!course) throw new ApiError(404, "Course not found");

  if (
    req.user?.role !== UserRoles.ADMIN &&
    !course.instructor.equals(req.user!._id)
  ) {
    throw new ApiError(403, "Not authorized.");
  }

  const publishedCourse = await Course.findByIdAndUpdate(
    courseId,
    {
      $set: { isPublished: true },
    },
    {
      new: true,
    }
  );

  if (!publishedCourse) throw new ApiError(500, "Failed to publish course");

  await Promise.all([
    cache.set(courseKey(courseId), publishedCourse),
    cache.del(courseKey("all")),
  ]);

  return res.status(200).json(
    new ApiResponse(200, "Course published successfully", {
      course: publishedCourse,
    })
  );
};

export const draftCourseById = async (req: Request, res: Response) => {
  const courseId = req.params.courseId as string;

  const course = await Course.findById(courseId);

  if (!course) throw new ApiError(404, "Course not found");

  if (
    req.user?.role !== UserRoles.ADMIN &&
    !course.instructor.equals(req.user!._id)
  ) {
    throw new ApiError(403, "Not authorized.");
  }

  const publishedCourse = await Course.findByIdAndUpdate(
    courseId,
    {
      $set: { isPublished: false },
    },
    {
      new: true,
    }
  );

  if (!publishedCourse) throw new ApiError(500, "Failed to draft course");

  await Promise.all([
    cache.set(courseKey(courseId), publishedCourse),
    cache.del(courseKey("all")),
  ]);

  return res.status(200).json(
    new ApiResponse(200, "Course drafted successfully", {
      course: publishedCourse,
    })
  );
};
