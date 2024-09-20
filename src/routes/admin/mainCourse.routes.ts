import { Router } from "express";

import {
  createCourse,
  deleteCourse,
  getAllCourses,
  getCourseById,
  updateCourse,
} from "../../controllers/admin/mainCourses.controller";
import { upload } from "../../middlewares/multer.middleware";
import { verifyCustomer } from "../../middlewares/customer.middleware";

const mainCourseRouter = Router();

mainCourseRouter
  .route("/create")
  .post(upload.single("instructorImage"), verifyCustomer, createCourse);

mainCourseRouter.route("/get").get(verifyCustomer, getAllCourses);

mainCourseRouter.route("/:courseId").get(verifyCustomer, getCourseById);

mainCourseRouter
  .route("/update/:courseId")
  .put(verifyCustomer, updateCourse);

mainCourseRouter
  .route("/delete/:courseId")
  .delete(verifyCustomer, deleteCourse);

export { mainCourseRouter };
