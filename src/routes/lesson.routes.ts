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

lessonRouter.route("/").get(getLessons);

lessonRouter.route("/").post(
  upload.fields([
    { name: "thumbnailImage", maxCount: 1 },
    { name: "lessonVideo", maxCount: 1 },
  ]),
  createLesson
);

lessonRouter.route("/:lessonId").get(getLessonById);

lessonRouter.route("/update/:lessonId").put(updateLesson);

lessonRouter.route("/delete/:lessonId").delete(deleteLesson);

export { lessonRouter };
