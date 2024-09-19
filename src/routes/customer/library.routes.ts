import { Router } from "express";

import {
  addCourseToLibrary,
  deleteCourseFromLibrary,
  getUserLibrary,
  updateCourseProgress,
} from "../../controllers/customer/library.controller";
import { verifyJWT } from "../../middlewares/auth.middleware";

const libraryRouter = Router();

// Protected route

libraryRouter
  .route("/create/:courseId")
  .post(verifyJWT, addCourseToLibrary);

libraryRouter.route("/get").get(verifyJWT, getUserLibrary);

libraryRouter
  .route("/update/:libraryId")
  .put(verifyJWT, updateCourseProgress);

libraryRouter
  .route("/delete/:libraryId")
  .delete(verifyJWT, deleteCourseFromLibrary);

export { libraryRouter };
