import { Router } from "express";

import {
  createCourse,
  deleteCourse,
  getAllCourses,
  getCourseById,
  updateCourse,
} from "../../controllers/admin/mainCourses.controller";
import { upload } from "../../middlewares/multer.middleware";
import { verifyJwt } from "../../middlewares/verifyJwt.middleware";

const mainCourseRouter = Router();

mainCourseRouter
  .route("/create")
  .post(upload.single("instructorImage"), verifyJwt, createCourse);

mainCourseRouter.route("/get").get(verifyJwt, getAllCourses);

mainCourseRouter.route("/:courseId").get(verifyJwt, getCourseById);

mainCourseRouter.route("/update/:courseId").put(verifyJwt, updateCourse);

mainCourseRouter
  .route("/delete/:courseId")
  .delete(verifyJwt, deleteCourse);

export { mainCourseRouter };
