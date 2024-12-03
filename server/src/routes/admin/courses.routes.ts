import { Router } from "express";
import { getAllCourses } from "../../controllers/admin/courses.controller";
import { verifyJwt } from "../../middlewares/verifyJwt.middleware";

const adminCoursesRoutes = Router();

adminCoursesRoutes.route("/").get(verifyJwt, getAllCourses);

export { adminCoursesRoutes };
