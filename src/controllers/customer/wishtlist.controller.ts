import { cache } from "../../config/node-cache";
import { Wishlist } from "../../models/customer/wishlist.model";
import { ApiError, ApiSuccess } from "../../utils/apiResponse";
import { dbHandler } from "../../utils/dbHandler";
import { isValidObjectId } from "mongoose";

export const getWishlist = dbHandler(async (req, res) => {
  const userId = req.params.userId;

  if (!isValidObjectId(userId)) throw new ApiError("Invalid userId");

  const cacheKey = `wishlist-${userId}`;

  if (cache.has(cacheKey)) {
    const cachedWishlist = cache.get(cacheKey);

    return res
      .status(200)
      .json(
        new ApiSuccess("Wishlist fetched successfully", cachedWishlist)
      );
  }

  const wishlist = await Wishlist.findOne({ userId })
    .populate({
      path: "courseId",
      populate: { path: "subjectName", model: "CurrentPursuing" },
    })
    .populate("userId");

  if (!wishlist) throw new ApiError("Wishlist not found");

  cache.set(cacheKey, wishlist);

  res
    .status(200)
    .json(new ApiSuccess("Wishlist fetched successfully", wishlist));
});

export const addWishlist = dbHandler(async (req, res) => {
  const userId = req.user?._id;
  const courseId = req.params.courseId;

  if (!isValidObjectId(courseId)) throw new ApiError("Invalid courseId");

  const wishlist = await Wishlist.create({
    userId,
    courseId,
  });

  if (!wishlist) throw new ApiError("Wishlist not found");

  const cacheKey = `wishlist-${userId}`;

  if (cache.has(cacheKey)) cache.del(cacheKey);

  res
    .status(200)
    .json(new ApiSuccess("Wishlist added successfully", wishlist));
});

export const deleteWishlist = dbHandler(async (req, res) => {
  const wishlistId = req.params.courseId;
  const userId = req.user?._id;

  if (!isValidObjectId(wishlistId)) throw new ApiError("Invalid courseId");

  const wishlist = await Wishlist.findByIdAndDelete(wishlistId);

  if (!wishlist) throw new ApiError("Wishlist not found");

  const cacheKey = `wishlist-${userId}`;

  if (cache.has(cacheKey)) cache.del(cacheKey);

  res
    .status(200)
    .json(new ApiSuccess("Wishlist deleted successfully", wishlist));
});

export const clearWishlist = dbHandler(async (req, res) => {
  const userId = req.user?._id;

  if (!isValidObjectId(userId)) throw new ApiError("Invalid userId");

  const wishlist = await Wishlist.deleteMany({ userId });

  if (wishlist.deletedCount === 0)
    throw new ApiError("Wishlist not found");

  const cacheKey = `wishlist-${userId}`;

  if (cache.has(cacheKey)) cache.del(cacheKey);

  res
    .status(200)
    .json(new ApiSuccess("Wishlist deleted successfully", wishlist));
});
