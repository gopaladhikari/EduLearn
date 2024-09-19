import { isValidObjectId } from "mongoose";
import { Library } from "../../models/customer/library.model";
import { ApiError, ApiSuccess } from "../../utils/apiResponse";
import { dbHandler } from "../../utils/dbHandler";
import { cache } from "../../config/node-cache";

// Add course to user's library
export const addCourseToLibrary = dbHandler(async (req, res) => {
  const userId = req.user?._id;
  const courseId = req.params.courseId;

  if (!isValidObjectId(courseId))
    throw new ApiError("Course id not valid");

  const existingEntry = await Library.findOne({
    userId,
    courseId,
  });

  if (existingEntry) throw new ApiError("Course already in library");

  const libraryEntry = await Library.create({
    userId,
    courseId,
  });

  if (!libraryEntry) throw new ApiError("Library entry not created");

  const cacheKey = `library-${userId}`;

  if (cache.has(cacheKey)) cache.del(cacheKey);

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

  const cacheKey = `library-${userId}`;

  cache.set(cacheKey, libraryCourses);

  res
    .status(200)
    .json(new ApiSuccess("Library fetched successfully", libraryCourses));
});

// Update course progress
export const updateCourseProgress = dbHandler(async (req, res) => {
  const libraryId = req.params.libraryId;
  const userId = req.user?._id;

  if (!isValidObjectId(libraryId))
    throw new ApiError("Library id not valid");

  const { progress } = req.body;

  if (!isValidObjectId(libraryId))
    throw new ApiError("Course id not valid");

  const libraryEntry = await Library.findByIdAndUpdate(
    libraryId,
    {
      progress: progress,
    },
    { new: true }
  );

  if (!libraryEntry) throw new ApiError("Course not found in library");

  libraryEntry.progress = progress;

  if (progress === 100) libraryEntry.isCompleted = true;

  await libraryEntry.save();

  const cacheKey = `library-${userId}`;

  if (cache.has(cacheKey)) cache.del(cacheKey);

  res.status(200).json(libraryEntry);
});

export const deleteCourseFromLibrary = dbHandler(async (req, res) => {
  const libraryId = req.params.libraryId;
  const userId = req.user?._id;

  if (!isValidObjectId(libraryId))
    throw new ApiError("Course id not valid");

  const libraryEntry = await Library.findByIdAndDelete(libraryId);

  if (!libraryEntry) throw new ApiError("Course not found in library");

  const cacheKey = `library-${userId}`;

  if (cache.has(cacheKey)) cache.del(cacheKey);

  res
    .status(200)
    .json(new ApiSuccess("Course deleted successfully", libraryEntry));
});
