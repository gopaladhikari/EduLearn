import { Router } from "express";
import {
  createReview,
  deleteReview,
  getAllReviewsByCourseId,
  updatedReview,
} from "../../controllers/customer/topReviews.controller";
import { verifyCustomer } from "../../middlewares/customer.middleware";

const topReviewsRouter = Router();

topReviewsRouter
  .route("/create/:courseId")
  .post(verifyCustomer, createReview);

topReviewsRouter
  .route("/get/:courseId")
  .get(verifyCustomer, getAllReviewsByCourseId);

topReviewsRouter
  .route("/update/:reviewId")
  .put(verifyCustomer, updatedReview);

topReviewsRouter
  .route("/delete/:reviewId")
  .delete(verifyCustomer, deleteReview);

export { topReviewsRouter };
