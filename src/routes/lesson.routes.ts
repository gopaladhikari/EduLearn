import { Router } from "express";
import { createLesson } from "../controllers/lesson.controllers";
import { upload } from "../middlewares/multer.middleware";

const lessonRouter = Router();

lessonRouter.route("/").post(
  upload.fields([
    { name: "thumbnailImage", maxCount: 1 },
    { name: "lessonVideo", maxCount: 1 },
  ]),
  createLesson
);

export { lessonRouter };
