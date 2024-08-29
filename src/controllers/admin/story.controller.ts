import { isValidObjectId } from "mongoose";
import { ApiError, ApiSuccess } from "../../utils/apiResponse";
import { dbHandler } from "../../utils/dbHandler";
import { Story } from "../../models/user/story.model";
import fs from "fs";
import path from "path";

export const getStories = dbHandler(async (req, res) => {
  const userId = req.user?._id;

  const stories = await Story.find({ userId });

  if (!stories) throw new ApiError("Stories not found");

  res
    .status(200)
    .json(new ApiSuccess("Stories fetched successfully", stories));
});

export const addStory = dbHandler(async (req, res) => {
  const userId = req.user?._id;

  const pdfFilePath = req.file?.path;

  if (!pdfFilePath) throw new ApiError("File not found");

  const story = await Story.create({
    userId,
    story: pdfFilePath,
  });

  if (!story) throw new ApiError("Story not created");

  res
    .status(200)
    .json(new ApiSuccess("Story created successfully", story));
});

export const deleteStory = dbHandler(async (req, res) => {
  const storyId = req.params.storyId;

  if (!isValidObjectId(storyId)) throw new ApiError("Invalid story id");

  const story = await Story.findByIdAndDelete(storyId);

  if (!story) throw new ApiError("Story not found");

  res
    .status(200)
    .json(new ApiSuccess("Story deleted successfully", story));
});

export const updateStory = dbHandler(async (req, res) => {
  const storyId = req.params.storyId;

  const pdfFilePath = req.file?.path;

  if (!pdfFilePath) throw new ApiError("File not found");
  if (!isValidObjectId(storyId)) throw new ApiError("Invalid story id");

  const story = await Story.findById(storyId);

  if (!story) throw new ApiError("Story not found");

  const oldStoryPath = path.join(__dirname, story.story);

  fs.unlinkSync(oldStoryPath);

  story.story = pdfFilePath;

  await story.save();

  res
    .status(200)
    .json(new ApiSuccess("Story updated successfully", story));
});
