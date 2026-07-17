import { Router } from "express";
import {
  getCourses,
  getCourseById,
  createCourse,
  deleteCourseById,
  publishCourseById,
  updateCourseById,
  draftCourseById,
} from "../controllers/courses.controller.js";
import passport from "passport";
import { UserRoles } from "@/utils/constants.js";
import { rbac } from "@/middlewares/rbac.middleware.js";
import { validateRequest } from "@/middlewares/validator.middleware.js";
import {
  createCourseSchema,
  updateCourseSchema,
} from "@/schemas/course.schema.js";
import { validateMongoId } from "@/schemas/validate-mongo-id.js";
import { upload } from "@/middlewares/multer.middleware.js";

const verifyJwt = passport.authenticate("jwt", { session: false });

const courseRouter = Router();

courseRouter
  .route("/")
  .get(getCourses)
  .post(
    verifyJwt,
    rbac([UserRoles.INSTRUCTOR]),
    validateRequest({ body: createCourseSchema }),
    upload.single("thumbnail"),
    createCourse
  );

courseRouter
  .route("/:courseId")
  .get(validateRequest({ params: validateMongoId("courseId") }), getCourseById)
  .delete(
    verifyJwt,
    rbac([UserRoles.INSTRUCTOR, UserRoles.ADMIN]),
    validateRequest({ params: validateMongoId("courseId") }),
    deleteCourseById
  )
  .patch(
    verifyJwt,
    rbac([UserRoles.INSTRUCTOR, UserRoles.ADMIN]),
    validateRequest({
      params: validateMongoId("courseId"),
      body: updateCourseSchema,
    }),
    updateCourseById
  );

courseRouter
  .route("/:courseId/publish")
  .patch(
    verifyJwt,
    rbac([UserRoles.INSTRUCTOR, UserRoles.ADMIN]),
    validateRequest({ params: validateMongoId("courseId") }),
    publishCourseById
  );

courseRouter
  .route("/:courseId/draft")
  .patch(
    verifyJwt,
    rbac([UserRoles.INSTRUCTOR, UserRoles.ADMIN]),
    validateRequest({ params: validateMongoId("courseId") }),
    draftCourseById
  );

export { courseRouter };
