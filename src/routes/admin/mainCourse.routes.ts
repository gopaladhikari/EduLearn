import { Router } from "express";

import {
  createCourse,
  deleteCourse,
  getAllCourses,
  getCourseById,
  updateCourse,
} from "../../controllers/admin/mainCourses.controller";
import { upload } from "../../middlewares/multer.middleware";
import { verifyJWT } from "../../middlewares/auth.middleware";

const mainCourseRouter = Router();

mainCourseRouter
  .route("/create")
  .post(upload.single("instructorImage"), verifyJWT, createCourse);

mainCourseRouter.route("/get").get(verifyJWT, getAllCourses);

mainCourseRouter.route("/:courseId").get(verifyJWT, getCourseById);

mainCourseRouter.route("/update/:courseId").put(verifyJWT, updateCourse);

mainCourseRouter
  .route("/delete/:courseId")
  .delete(verifyJWT, deleteCourse);

export { mainCourseRouter };
