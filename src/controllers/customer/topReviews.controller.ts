import { isValidObjectId } from "mongoose";
import { TopReviews } from "../../models/customer/topReviews.model";
import {
  createReviewSchema,
  updateReviewSchema,
} from "../../schemas/topReview.schema";
import { ApiError, ApiSuccess } from "../../utils/apiResponse";
import { dbHandler } from "../../utils/dbHandler";
import { cache } from "../../config/node-cache";

export const createReview = dbHandler(async (req, res) => {
  const courseId = req.params.courseId;
  const userId = req.user?._id;

  if (!isValidObjectId(courseId))
    throw new ApiError(400, "Invalid course id");

  const { success, data, error } = createReviewSchema.safeParse(req.body);

  if (!success) throw new ApiError(400, error.message);

  const review = await TopReviews.create({
    courseId,
    userId,
    review: data.review,
    rating: data.rating,
    userName: data.userName,
  });

  if (!review) throw new ApiError(400, "Review not created");

  const cacheKey = `topReviews-${userId}`;

  if (cache.has(cacheKey)) cache.del(cacheKey);

  return res
    .status(201)
    .json(new ApiSuccess("Review created successfully!", review));
});

export const getAllReviewsByCourseId = dbHandler(async (req, res) => {
  const courseId = req.params.courseId;
  const userId = req.user?._id;

  if (!isValidObjectId(courseId))
    throw new ApiError(400, "Course id is required");

  const cacheKey = `topReviews-${userId}`;

  if (cache.has(cacheKey)) {
    const cachedReviews = cache.get(cacheKey);

    return res
      .status(200)
      .json(new ApiSuccess("Reviews found successfully!", cachedReviews));
  }

  const reviews = await TopReviews.find({ courseId });

  if (!reviews.length)
    throw new ApiError(400, "No reviews found for this course");

  cache.set(cacheKey, reviews);

  return res
    .status(200)
    .json(new ApiSuccess("Reviews found successfully!", reviews));
});

export const updatedReview = dbHandler(async (req, res) => {
  const reviewId = req.params.reviewId;
  const userId = req.user?._id;

  if (!isValidObjectId(reviewId))
    throw new ApiError(400, "Review id is required");

  const { success, data, error } = updateReviewSchema.safeParse(req.body);

  if (!success) throw new ApiError(400, error.message);

  const updatedReview = await TopReviews.findByIdAndUpdate(
    reviewId,
    {
      review: data.review,
      rating: data.rating,
    },
    { new: true }
  );

  if (!updatedReview) throw new ApiError(400, "Review not found");

  const cacheKey = `topReviews-${userId}`;

  if (cache.has(cacheKey)) cache.del(cacheKey);

  return res
    .status(200)
    .json(new ApiSuccess("Review updated successfully!", updatedReview));
});

export const deleteReview = dbHandler(async (req, res) => {
  const reviewId = req.params.reviewId;
  const userId = req.user?._id;

  if (!isValidObjectId(reviewId))
    throw new ApiError(400, "Review id is required");

  const deletedReview = await TopReviews.findByIdAndDelete(reviewId);

  if (!deletedReview) throw new ApiError(400, "Review not found");

  const cacheKey = `topReviews-${userId}`;

  if (cache.has(cacheKey)) cache.del(cacheKey);

  return res
    .status(200)
    .json(new ApiSuccess("Review deleted successfully!", deletedReview));
});
