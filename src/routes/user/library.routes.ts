import { Router } from "express";

import {
  addCourseToLibrary,
  deleteCourseFromLibrary,
  getUserLibrary,
  updateCourseProgress,
} from "../../controllers/user/library.controller";

const libraryRouter = Router();

libraryRouter.route("/").post(addCourseToLibrary);

libraryRouter.get("/:userId", getUserLibrary);

libraryRouter.put("/update", updateCourseProgress);

libraryRouter.delete("/delete", deleteCourseFromLibrary);

export { libraryRouter };
