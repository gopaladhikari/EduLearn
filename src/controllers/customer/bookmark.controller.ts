import { ApiError, ApiSuccess } from "../../utils/apiResponse";
import { dbHandler } from "../../utils/dbHandler";
import { isValidObjectId } from "mongoose";
import { Bookmark } from "../../models/customer/bookmark.model";
import { cache } from "../../config/node-cache";

export const getBookmarks = dbHandler(async (req, res) => {
  const userId = req.customer?._id;

  const cacheKey = `bookmarks-${userId}`;

  if (cache.has(cacheKey)) {
    const cachedBookmarks = cache.get(cacheKey);
    return res
      .status(200)
      .json(
        new ApiSuccess("Bookmarks fetched successfully", cachedBookmarks)
      );
  }

  const bookmarks = await Bookmark.find({ userId }).populate(
    "mainCourseId"
  );

  if (!bookmarks) throw new ApiError(400, "Bookmarks not found");

  cache.set(cacheKey, bookmarks);

  res
    .status(200)
    .json(new ApiSuccess("Bookmarks fetched successfully", bookmarks));
});

export const addBookmark = dbHandler(async (req, res) => {
  const userId = req.customer?._id;

  const mainCourseId = req.params.mainCourseId;

  const cacheKey = `bookmarks-${userId}`;

  if (!isValidObjectId(mainCourseId))
    throw new ApiError(400, "Invalid main course id");

  const bookmark = await Bookmark.create({
    userId,
    mainCourseId,
  });

  if (!bookmark) throw new ApiError(400, "Bookmark not created");

  if (cache.has(cacheKey)) cache.del(cacheKey);

  res
    .status(200)
    .json(new ApiSuccess("Bookmark created successfully", bookmark));
});

export const deleteBookmark = dbHandler(async (req, res) => {
  const bookmarkId = req.params.bookmarkId;
  const userId = req.customer?._id;

  if (!isValidObjectId(bookmarkId))
    throw new ApiError(400, "Invalid bookmark id");

  const cacheKey = `bookmarks-${userId}`;

  const bookmark = await Bookmark.findByIdAndDelete(bookmarkId);

  if (!bookmark) throw new ApiError(400, "Bookmark not found");

  if (cache.has(cacheKey)) cache.del(cacheKey);

  res
    .status(200)
    .json(new ApiSuccess("Bookmark deleted successfully", bookmark));
});
