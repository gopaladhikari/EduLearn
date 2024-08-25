import { Router } from "express";

import {
  createCourse,
  deleteCourse,
  getAllCourses,
  getCourseById,
  updateCourse,
} from "../../controllers/admin/mainCourses.controller";
import { upload } from "../../middlewares/multer.middleware";

const mainCourseRouter = Router();

mainCourseRouter
  .route("/")
  .post(upload.single("instructorImage"), createCourse);

mainCourseRouter.route("/").get(getAllCourses);
mainCourseRouter.route("/:courseId").get(getCourseById);
mainCourseRouter.route("/update/:courseId").put(updateCourse);
mainCourseRouter.route("/delete/:courseId").delete(deleteCourse);

export { mainCourseRouter };
