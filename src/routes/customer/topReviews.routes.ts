import { Router } from "express";
import {
  createReview,
  deleteReview,
  getAllReviewsByCourseId,
  updatedReview,
} from "../../controllers/customer/topReviews.controller";
import { verifyJwt } from "../../middlewares/verifyJwt";

const topReviewsRouter = Router();

topReviewsRouter.route("/create/:courseId").post(verifyJwt, createReview);

topReviewsRouter
  .route("/get/:courseId")
  .get(verifyJwt, getAllReviewsByCourseId);

topReviewsRouter.route("/update/:reviewId").put(verifyJwt, updatedReview);

topReviewsRouter
  .route("/delete/:reviewId")
  .delete(verifyJwt, deleteReview);

export { topReviewsRouter };
