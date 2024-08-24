import { TopReviews } from "../../models/user/topReviews.model";
import {
  createReviewSchema,
  updateReviewSchema,
} from "../../schemas/topReview.schema";
import { ApiError, ApiSuccess } from "../../utils/apiResponse";
import { dbHandler } from "../../utils/dbHandler";

export const createReview = dbHandler(async (req, res) => {
  const { success, data, error } = createReviewSchema.safeParse(
    req.body
  );

  if (!success) throw new ApiError(error.message);

  const review = await TopReviews.create({
    name: data.userName,
    review: data.review,
    rating: data.rating,
    courseId: data.courseId,
    userId: data.userId,
    userName: data.userName,
  });

  if (!review) throw new ApiError("Review not created");

  return res
    .status(201)
    .json(new ApiSuccess("Review created successfully!", review));
});

export const getAllReviewsByCourseId = dbHandler(async (req, res) => {
  const courseId = req.params.courseId;

  if (!courseId) throw new ApiError("Course id is required");

  const reviews = await TopReviews.find({ courseId });

  if (!reviews.length)
    throw new ApiError("No reviews found for this course");

  return res
    .status(200)
    .json(new ApiSuccess("Reviews found successfully!", reviews));
});

export const updatedReview = dbHandler(async (req, res) => {
  const reviewId = req.params.reviewId;

  if (!reviewId) throw new ApiError("Review id is required");

  const { success, data, error } = updateReviewSchema.safeParse(
    req.body
  );

  if (!success) throw new ApiError(error.message);

  const updatedReview = await TopReviews.findByIdAndUpdate(
    reviewId,
    {
      review: data.review,
      rating: data.rating,
    },
    { new: true }
  );

  if (!updatedReview) throw new ApiError("Review not found");

  return res
    .status(200)
    .json(
      new ApiSuccess("Review updated successfully!", updatedReview)
    );
});

export const deleteReview = dbHandler(async (req, res) => {
  const reviewId = req.params.reviewId;

  if (!reviewId) throw new ApiError("Review id is required");

  const deletedReview = await TopReviews.findByIdAndDelete(reviewId);

  if (!deletedReview) throw new ApiError("Review not found");

  return res
    .status(200)
    .json(
      new ApiSuccess("Review deleted successfully!", deletedReview)
    );
});
