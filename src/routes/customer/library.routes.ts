import { Router } from "express";

import {
  addCourseToLibrary,
  deleteCourseFromLibrary,
  getUserLibrary,
  updateCourseProgress,
} from "../../controllers/customer/library.controller";
import { verifyCustomer } from "../../middlewares/customer.middleware";

const libraryRouter = Router();

// Protected route

libraryRouter
  .route("/create/:courseId")
  .post(verifyCustomer, addCourseToLibrary);

libraryRouter.route("/get").get(verifyCustomer, getUserLibrary);

libraryRouter
  .route("/update/:libraryId")
  .put(verifyCustomer, updateCourseProgress);

libraryRouter
  .route("/delete/:libraryId")
  .delete(verifyCustomer, deleteCourseFromLibrary);

export { libraryRouter };
