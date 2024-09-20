import { MainCourse } from "../../models/admin/mainCourses.model";
import { ApiError, ApiSuccess } from "../../utils/apiResponse";
import { dbHandler } from "../../utils/dbHandler";
import { mainCourseSchema } from "../../schemas/mainCourses.schema";
import { isValidObjectId } from "mongoose";
import { cache } from "../../config/node-cache";

export const createCourse = dbHandler(async (req, res) => {
  const { success, data, error } = mainCourseSchema.safeParse(req.body);
  const userId = req.user?._id;

  if (!success) throw new ApiError(400, error.message);

  const instructorImagePath = req.file?.path;

  if (!instructorImagePath)
    throw new ApiError(400, "Instructor image is required");

  const course = await MainCourse.create({
    courseType: data.courseType,
    coursePursuing: data.coursePursuing,
    semester: data.semester,
    instructorImage: instructorImagePath,
    subject: data.subject,
    universityName: data.universityName,
    totalClasses: data.totalClasses,
    duration: data.duration,
    price: data.price,
    rating: data.rating,
    courseDetails: data.courseDetails,
    instructor: data.instructor,
    lessonsVideos: data.lessonsVideos,
  });

  if (!course) throw new ApiError(400, "Could not create course");

  const cacheKey = `mainCourse-${userId}`;

  if (cache.has(cacheKey)) cache.del(cacheKey);

  res.status(201).json(new ApiSuccess("Course created", course));
});

export const getAllCourses = dbHandler(async (req, res) => {
  const userId = req.user?._id;

  const cacheKey = `mainCourse-${userId}`;

  if (cache.has(cacheKey)) {
    const cachedCourses = cache.get(cacheKey);

    return res
      .status(200)
      .json(new ApiSuccess("All courses", cachedCourses));
  }

  const courses = await MainCourse.find();

  if (!courses) throw new ApiError(400, "Could not get all courses");

  cache.set(cacheKey, courses);

  res.status(200).json(new ApiSuccess("All courses", courses));
});

export const getCourseById = dbHandler(async (req, res) => {
  const courseId = req.params.courseId;
  const userId = req.user?._id;

  if (!isValidObjectId(courseId)) throw new ApiError(400, "Invalid id");

  const course = await MainCourse.findById(courseId);

  if (!course) throw new ApiError(400, "Could not get course by id");

  const cacheKey = `mainCourse-${userId}-${courseId}`;
  const cacheKey2 = `mainCourse-${userId}`;

  if (cache.has(cacheKey)) cache.del(cacheKey);
  if (cache.has(cacheKey2)) cache.del(cacheKey2);

  res.status(200).json(new ApiSuccess("Course by id", course));
});

export const updateCourse = dbHandler(async (req, res) => {
  const courseId = req.params.courseId;
  const userId = req.user?._id;

  if (!isValidObjectId(courseId)) throw new ApiError(400, "Invalid id");

  const { success, data, error } = mainCourseSchema.safeParse(req.body);

  const instructorImagePath = req.file?.path;

  if (!instructorImagePath)
    throw new ApiError(400, "Instructor image is required");

  if (!success) throw new ApiError(400, error.message);

  const updatedCourse = await MainCourse.findByIdAndUpdate(
    courseId,
    {
      courseType: data.courseType,
      courseImage: instructorImagePath,
      coursePursuing: data.coursePursuing,
      semester: data.semester,
      subject: data.subject,
      universityName: data.universityName,
      totalClasses: data.totalClasses,
      duration: data.duration,
      price: data.price,
      rating: data.rating,
      courseDetails: data.courseDetails,
      instructor: data.instructor,
      lessonsVideos: data.lessonsVideos,
    },
    { new: true }
  );

  if (!updatedCourse) throw new ApiError(400, "Could not update course");

  const cacheKey = `mainCourse-${userId}-${courseId}`;
  const cacheKey2 = `mainCourse-${userId}`;

  if (cache.has(cacheKey)) cache.del(cacheKey);
  if (cache.has(cacheKey2)) cache.del(cacheKey2);

  res.status(200).json(new ApiSuccess("Course updated", updatedCourse));
});

export const deleteCourse = dbHandler(async (req, res) => {
  const courseId = req.params.courseId;
  const userId = req.user?._id;

  if (!isValidObjectId(courseId)) throw new ApiError(400, "Invalid id");

  const deletedCourse = await MainCourse.findByIdAndDelete(courseId);

  if (!deletedCourse) throw new ApiError(400, "Could not delete course");

  const cacheKey = `mainCourse-${userId}-${courseId}`;
  const cacheKey2 = `mainCourse-${userId}`;

  if (cache.has(cacheKey)) cache.del(cacheKey);
  if (cache.has(cacheKey2)) cache.del(cacheKey2);

  res.status(200).json(new ApiSuccess("Course deleted", deletedCourse));
});
