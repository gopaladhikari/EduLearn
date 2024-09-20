import { isValidObjectId } from "mongoose";
import { ApiError, ApiSuccess } from "../../utils/apiResponse";
import { dbHandler } from "../../utils/dbHandler";
import { Story } from "../../models/customer/story.model";
import fs from "fs";
import path from "path";
import { cache } from "../../config/node-cache";

export const getStories = dbHandler(async (req, res) => {
  const userId = req.user?._id;

  const cacheKey = `stories-${userId}`;

  if (cache.has(cacheKey)) {
    const cachedStories = cache.get(cacheKey);

    return res
      .status(200)
      .json(new ApiSuccess("Stories fetched successfully", cachedStories));
  }

  const stories = await Story.find({ userId });

  if (!stories) throw new ApiError(400, "Stories not found");

  cache.set(cacheKey, stories);

  res
    .status(200)
    .json(new ApiSuccess("Stories fetched successfully", stories));
});

export const addStory = dbHandler(async (req, res) => {
  const userId = req.user?._id;

  const pdfFilePath = req.file?.path;

  if (!pdfFilePath) throw new ApiError(400, "File not found");

  const story = await Story.create({
    userId,
    story: pdfFilePath,
  });

  if (!story) throw new ApiError(400, "Story not created");

  const cacheKey = `stories-${userId}`;

  if (cache.has(cacheKey)) cache.del(cacheKey);

  res
    .status(200)
    .json(new ApiSuccess("Story created successfully", story));
});

export const deleteStory = dbHandler(async (req, res) => {
  const storyId = req.params.storyId;
  const userId = req.user?._id;

  if (!isValidObjectId(storyId))
    throw new ApiError(400, "Invalid story id");

  const story = await Story.findByIdAndDelete(storyId);

  if (!story) throw new ApiError(400, "Story not found");

  const cacheKey = `stories-${userId}`;

  if (cache.has(cacheKey)) cache.del(cacheKey);

  res
    .status(200)
    .json(new ApiSuccess("Story deleted successfully", story));
});

export const updateStory = dbHandler(async (req, res) => {
  const storyId = req.params.storyId;
  const userId = req.user?._id;
  const pdfFilePath = req.file?.path;

  if (!pdfFilePath) throw new ApiError(400, "File not found");
  if (!isValidObjectId(storyId))
    throw new ApiError(400, "Invalid story id");

  const story = await Story.findById(storyId);

  if (!story) throw new ApiError(400, "Story not found");

  const oldStoryPath = path.join(__dirname, story.story);

  fs.unlinkSync(oldStoryPath);

  story.story = pdfFilePath;

  await story.save();

  const cacheKey = `stories-${userId}`;

  if (cache.has(cacheKey)) cache.del(cacheKey);

  res
    .status(200)
    .json(new ApiSuccess("Story updated successfully", story));
});
