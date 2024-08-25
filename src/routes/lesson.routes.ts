import { Router } from "express";
import {
  createLesson,
  deleteLesson,
  getLessonById,
  getLessons,
  updateLesson,
} from "../controllers/lesson.controllers";
import { upload } from "../middlewares/multer.middleware";

const lessonRouter = Router();

lessonRouter.route("/get-all-lessons").get(getLessons);

lessonRouter.route("/create-lesson").post(
  upload.fields([
    { name: "thumbnailImage", maxCount: 1 },
    { name: "lessonVideo", maxCount: 1 },
  ]),
  createLesson
);

lessonRouter.route("/get-lesson-by-id/:lessonId").get(getLessonById);

lessonRouter.route("/update-lesson-by-id:lessonId").put(updateLesson);

lessonRouter.route("/delete-lesson-by-id/:lessonId").delete(deleteLesson);

export { lessonRouter };
