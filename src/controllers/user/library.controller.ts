import { isValidObjectId } from "mongoose";
import { Library } from "../../models/user/library.model";
import { ApiError, ApiSuccess } from "../../utils/apiResponse";
import { dbHandler } from "../../utils/dbHandler";

// Add course to user's library
export const addCourseToLibrary = dbHandler(async (req, res) => {
  const { courseId } = req.body;
  const userId = req.user?._id;

  if (!isValidObjectId(courseId))
    throw new ApiError("Course id not valid");

  const existingEntry = await Library.findOne({
    user: userId,
    course: courseId,
  });

  if (existingEntry) throw new ApiError("Course already in library");

  const libraryEntry = await Library.create({
    user: userId,
    course: courseId,
  });

  if (!libraryEntry) throw new ApiError("Library entry not created");

  res
    .status(201)
    .json(
      new ApiSuccess("Library entry created successfully", libraryEntry)
    );
});

// Get all courses in user's library
export const getUserLibrary = dbHandler(async (req, res) => {
  const userId = req.user?._id;

  const libraryCourses = await Library.find({ userId }).populate(
    "subjectName"
  );

  if (!libraryCourses) throw new ApiError("Library not found");

  res
    .status(200)
    .json(new ApiSuccess("Library fetched successfully", libraryCourses));
});

// Update course progress
export const updateCourseProgress = dbHandler(async (req, res) => {
  const userId = req.user?._id;

  const { courseId, progress } = req.body;

  if (!isValidObjectId(courseId))
    throw new ApiError("Course id not valid");

  const libraryEntry = await Library.findOne({
    userId,
    courseId,
  });

  if (!libraryEntry) {
    return res
      .status(404)
      .json({ message: "Course not found in library" });
  }

  libraryEntry.progress = progress;

  if (progress === 100) libraryEntry.isCompleted = true;

  await libraryEntry.save();

  res.status(200).json(libraryEntry);
});

export const deleteCourseFromLibrary = dbHandler(async (req, res) => {
  const { courseId } = req.body;
  const userId = req.user?._id;

  if (!isValidObjectId(courseId))
    throw new ApiError("Course id not valid");

  const libraryEntry = await Library.findOneAndDelete({
    userId,
    courseId,
  });

  if (!libraryEntry) throw new ApiError("Course not found in library");

  res
    .status(200)
    .json(new ApiSuccess("Course deleted successfully", libraryEntry));
});
