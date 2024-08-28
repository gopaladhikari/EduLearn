import { Wishlist } from "../../models/user/wishlist.model";
import { ApiError, ApiSuccess } from "../../utils/apiResponse";
import { dbHandler } from "../../utils/dbHandler";
import { isValidObjectId } from "mongoose";

export const getWishlist = dbHandler(async (req, res) => {
  const userId = req.params.userId;

  if (!isValidObjectId(userId)) throw new ApiError("Invalid userId");

  const wishlist = await Wishlist.findOne({ userId });
  if (!wishlist) throw new ApiError("Wishlist not found");

  res
    .status(200)
    .json(new ApiSuccess("Wishlist fetched successfully", wishlist));
});

export const addWishlist = dbHandler(async (req, res) => {
  const { userId, courseId } = req.body;

  if (!isValidObjectId(userId)) throw new ApiError("Invalid userId");
  if (!isValidObjectId(courseId)) throw new ApiError("Invalid courseId");

  const wishlist = await Wishlist.findOneAndUpdate(
    { userId },
    { userId, courseId },
    { upsert: true }
  );

  if (!wishlist) throw new ApiError("Wishlist not found");

  res
    .status(200)
    .json(new ApiSuccess("Wishlist added successfully", wishlist));
});

export const deleteWishlist = dbHandler(async (req, res) => {
  const { userId, courseId } = req.body;

  if (!isValidObjectId(userId)) throw new ApiError("Invalid userId");
  if (!isValidObjectId(courseId)) throw new ApiError("Invalid courseId");

  const wishlist = await Wishlist.findOneAndDelete(
    { userId, courseId },
    { upsert: true }
  );

  if (!wishlist) throw new ApiError("Wishlist not found");

  res
    .status(200)
    .json(new ApiSuccess("Wishlist deleted successfully", wishlist));
});
