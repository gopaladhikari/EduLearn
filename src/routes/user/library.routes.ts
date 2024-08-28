import { Router } from "express";

import {
  addCourseToLibrary,
  deleteCourseFromLibrary,
  getUserLibrary,
  updateCourseProgress,
} from "../../controllers/user/library.controller";
import { verifyJWT } from "../../middlewares/auth.middleware";

const libraryRouter = Router();

// Protected route

libraryRouter.route("/create").post(verifyJWT, addCourseToLibrary);

libraryRouter.route("/get").get(verifyJWT, getUserLibrary);

libraryRouter.route("/update").put(verifyJWT, updateCourseProgress);

libraryRouter.route("/delete").delete(verifyJWT, deleteCourseFromLibrary);

export { libraryRouter };
