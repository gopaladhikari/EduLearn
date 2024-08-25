import { Router } from "express";
import {
  createReview,
  deleteReview,
  getAllReviewsByCourseId,
  updatedReview,
} from "../../controllers/user/topReviews.controller";

const topReviewsRouter = Router();

topReviewsRouter.route("/").get(createReview);

topReviewsRouter.route("/:courseId").get(getAllReviewsByCourseId);

topReviewsRouter.route("/update/:reviewId").put(updatedReview);

topReviewsRouter.route("/delete/:reviewId").delete(deleteReview);

export { topReviewsRouter };
