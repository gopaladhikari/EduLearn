import { Router } from "express";
import {
  createReview,
  deleteReview,
  getAllReviewsByCourseId,
  updatedReview,
} from "../../controllers/user/topReviews.controller";
import { verifyJWT } from "../../middlewares/auth.middleware";

const topReviewsRouter = Router();

topReviewsRouter.route("/create/:courseId").post(verifyJWT, createReview);

topReviewsRouter
  .route("/get/:courseId")
  .get(verifyJWT, getAllReviewsByCourseId);

topReviewsRouter.route("/update/:reviewId").put(updatedReview);

topReviewsRouter.route("/delete/:reviewId").delete(deleteReview);

export { topReviewsRouter };
