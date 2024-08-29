import { ApiError, ApiSuccess } from "../../utils/apiResponse";
import { dbHandler } from "../../utils/dbHandler";
import { isValidObjectId } from "mongoose";
import { Bookmark } from "../../models/user/bookmark.model";

export const getBookmarks = dbHandler(async (req, res) => {
  const userId = req.user?._id;

  const bookmarks = await Bookmark.find({ userId }).populate(
    "mainCourseId"
  );

  if (!bookmarks) throw new ApiError("Bookmarks not found");

  res
    .status(200)
    .json(new ApiSuccess("Bookmarks fetched successfully", bookmarks));
});

export const addBookmark = dbHandler(async (req, res) => {
  const userId = req.user?._id;

  const mainCourseId = req.params.mainCourseId;

  if (!isValidObjectId(mainCourseId))
    throw new ApiError("Invalid main course id");

  const bookmark = await Bookmark.create({
    userId,
    mainCourseId,
  });

  if (!bookmark) throw new ApiError("Bookmark not created");

  res
    .status(200)
    .json(new ApiSuccess("Bookmark created successfully", bookmark));
});

export const deleteBookmark = dbHandler(async (req, res) => {
  const bookmarkId = req.params.bookmarkId;

  if (!isValidObjectId(bookmarkId))
    throw new ApiError("Invalid bookmark id");

  const bookmark = await Bookmark.findByIdAndDelete(bookmarkId);

  if (!bookmark) throw new ApiError("Bookmark not found");

  res
    .status(200)
    .json(new ApiSuccess("Bookmark deleted successfully", bookmark));
});
