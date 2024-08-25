import { MainCourse } from "../../models/admin/mainCourses.model";
import { ApiError, ApiSuccess } from "../../utils/apiResponse";
import { dbHandler } from "../../utils/dbHandler";
import { mainCourseSchema } from "../../schemas/mainCourses.schema";
import { isValidObjectId } from "mongoose";

export const createCourse = dbHandler(async (req, res) => {
  const { success, data, error } = mainCourseSchema.safeParse(req.body);

  if (!success) throw new ApiError(error.message);

  const instructorImagePath = req.file?.path;

  if (!instructorImagePath)
    throw new ApiError("Instructor image is required");

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

  if (!course) throw new ApiError("Could not create course");

  res.status(201).json(new ApiSuccess("Course created", course));
});

export const getAllCourses = dbHandler(async (_, res) => {
  const courses = await MainCourse.find();

  if (!courses) throw new ApiError("Could not get all courses");

  res.status(200).json(new ApiSuccess("All courses", courses));
});

export const getCourseById = dbHandler(async (req, res) => {
  const courseId = req.params.courseId;

  if (!isValidObjectId(courseId)) throw new ApiError("Invalid id");

  const course = await MainCourse.findById(courseId);

  if (!course) throw new ApiError("Could not get course by id");

  res.status(200).json(new ApiSuccess("Course by id", course));
});

export const updateCourse = dbHandler(async (req, res) => {
  const courseId = req.params.courseId;

  if (!isValidObjectId(courseId)) throw new ApiError("Invalid id");

  const { success, data, error } = mainCourseSchema.safeParse(req.body);

  const instructorImagePath = req.file?.path;

  if (!instructorImagePath)
    throw new ApiError("Instructor image is required");

  if (!success) throw new ApiError(error.message);

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

  if (!updatedCourse) throw new ApiError("Could not update course");

  res.status(200).json(new ApiSuccess("Course updated", updatedCourse));
});

export const deleteCourse = dbHandler(async (req, res) => {
  const courseId = req.params.courseId;

  if (!isValidObjectId(courseId)) throw new ApiError("Invalid id");

  const deletedCourse = await MainCourse.findByIdAndDelete(courseId);

  if (!deletedCourse) throw new ApiError("Could not delete course");

  res.status(200).json(new ApiSuccess("Course deleted", deletedCourse));
});
