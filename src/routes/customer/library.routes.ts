import { Router } from "express";

import {
  addCourseToLibrary,
  deleteCourseFromLibrary,
  getUserLibrary,
  updateCourseProgress,
} from "../../controllers/customer/library.controller";
import { verifyJwt } from "../../middlewares/verifyJwt.middleware";

const libraryRouter = Router();

// Protected route

libraryRouter
  .route("/create/:courseId")
  .post(verifyJwt, addCourseToLibrary);

libraryRouter.route("/get").get(verifyJwt, getUserLibrary);

libraryRouter
  .route("/update/:libraryId")
  .put(verifyJwt, updateCourseProgress);

libraryRouter
  .route("/delete/:libraryId")
  .delete(verifyJwt, deleteCourseFromLibrary);

export { libraryRouter };
