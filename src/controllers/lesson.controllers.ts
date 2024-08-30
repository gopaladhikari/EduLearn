import mongoose, { isValidObjectId } from "mongoose";
import { Lesson } from "../models/lesson.model";
import { lessonSchema } from "../schemas/lessons.schema";
import { ApiError, ApiSuccess } from "../utils/apiResponse";
import { dbHandler } from "../utils/dbHandler";
import { cache } from "../config/node-cache";

type UploadedFiles =
  | {
      [key: string]: Express.Multer.File[];
    }
  | undefined;

export const createLesson = dbHandler(async (req, res) => {
  const userId = req.user?._id;

  const { success, data, error } = lessonSchema.safeParse(req.body);

  if (!success) throw new ApiError(error.message);

  const files = req.files as UploadedFiles;

  const thumbnailImagePath = files?.thumbnailImage[0].path;

  const lessonVideoPath = files?.lessonVideo[0].path;

  if (!thumbnailImagePath || !lessonVideoPath)
    throw new ApiError("Files are missing");

  const cacheKey = `lessons-${userId}`;

  const lesson = await Lesson.create({
    courseId: data.courseId,
    thumbnailImage: thumbnailImagePath,
    lessonTitle: data.lessonTitle,
    lessonDuration: data.lessonDuration,
    lessonVideo: lessonVideoPath,
    isPaid: data.isPaid,
  });

  if (!lesson) throw new ApiError("Lesson not created");

  if (cache.has(cacheKey)) cache.del(cacheKey);

  res
    .status(201)
    .json(new ApiSuccess("Lesson created successfully", lesson));
});

export const getLessons = dbHandler(async (req, res) => {
  const userId = req.user?._id;

  const cacheKey = `lessons-${userId}`;

  if (cache.has(cacheKey)) {
    const cachedLessons = cache.get(cacheKey);

    return res
      .status(200)
      .json(new ApiSuccess("Lessons fetched successfully", cachedLessons));
  }

  const lessons = await Lesson.find();

  if (!lessons.length) throw new ApiError("Lessons not found");

  cache.set(cacheKey, lessons);

  res
    .status(200)
    .json(new ApiSuccess("Lessons fetched successfully", lessons));
});

export const getLessonById = dbHandler(async (req, res) => {
  const lessonId = req.params.lessonId;
  const userId = req.user?._id;

  if (!isValidObjectId(lessonId)) throw new ApiError("Invalid lesson id");

  const cacheKey = `lessons-${userId}-${lessonId}`;

  if (cache.has(cacheKey)) {
    const cachedLesson = cache.get(cacheKey);

    return res
      .status(200)
      .json(new ApiSuccess("Lesson fetched successfully", cachedLesson));
  }

  const lesson = await Lesson.findById(lessonId);

  if (!lesson) throw new ApiError("Lesson not found");

  res
    .status(200)
    .json(new ApiSuccess("Lesson fetched successfully", lesson));
});

export const updateLesson = dbHandler(async (req, res) => {
  const lessonId = req.params.lessonId;
  const userId = req.user?._id;

  if (!isValidObjectId(lessonId)) throw new ApiError("Invalid lesson id");

  const { data, success, error } = lessonSchema.safeParse(req.body);

  if (!success) throw new ApiError(error.message);

  const files = req.files as UploadedFiles;

  const thumbnailImagePath = files?.thumbnailImage[0].path;
  const lessonVideoPath = files?.lessonVideo[0].path;

  const lesson = await Lesson.findById(lessonId);

  if (!lesson) throw new ApiError("Lesson not found");

  lesson.courseId = new mongoose.Types.ObjectId(data.courseId);
  lesson.lessonTitle = data.lessonTitle;
  lesson.lessonDuration = data.lessonDuration;
  lesson.isPaid = data.isPaid;

  if (thumbnailImagePath) lesson.thumbnailImage = thumbnailImagePath;

  if (lessonVideoPath) lesson.lessonVideo = lessonVideoPath;

  const updatedLesson = await lesson.save();

  if (!updatedLesson) throw new ApiError("Lesson not updated");

  const cacheKey = `lessons-${userId}`;
  const cacheKey2 = `lessons-${userId}-${lessonId}`;

  if (cache.has(cacheKey)) cache.del(cacheKey);
  if (cache.has(cacheKey2)) cache.del(cacheKey2);

  res
    .status(200)
    .json(new ApiSuccess("Lesson updated successfully", updatedLesson));
});

export const deleteLesson = dbHandler(async (req, res) => {
  const lessonId = req.params.lessonId;
  const userId = req.user?._id;

  if (!isValidObjectId(lessonId)) throw new ApiError("Invalid lesson id");

  const lesson = await Lesson.findByIdAndDelete(lessonId);

  if (!lesson) throw new ApiError("Lesson not found");

  const cacheKey = `lessons-${userId}`;

  if (cache.has(cacheKey)) cache.del(cacheKey);

  res
    .status(200)
    .json(new ApiSuccess("Lesson deleted successfully", lesson));
});
