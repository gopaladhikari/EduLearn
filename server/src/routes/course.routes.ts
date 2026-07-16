import { Router } from "express";
import {
  getCourses,
  getCourseById,
  createCourse,
  deleteCourseById,
  draftCourseById,
  publishCourseById,
  updateCourseById,
} from "../controllers/courses.controller.js";
import passport from "passport";
import { UserRoles } from "@/utils/constants.js";
import { rbac } from "@/middlewares/rbac.middleware.js";
import { validateRequest } from "@/middlewares/validator.middleware.js";
import {
  createCourseSchema,
  updateCourseSchema,
} from "@/schemas/course.schema.js";
import { validMongoIdSchema } from "@/schemas/valid-mongo-id.schema.js";

const verifyJwt = passport.authenticate("jwt", { session: false });

const courseRouter = Router();

courseRouter
  .route("/")
  .get(getCourses)
  .post(
    verifyJwt,
    rbac([UserRoles.INSTRUCTOR]),
    validateRequest({ body: createCourseSchema }),
    createCourse
  );

courseRouter
  .route("/:courseId")
  .get(
    validateRequest({ params: validMongoIdSchema("courseId") }),
    getCourseById
  )
  .delete(
    verifyJwt,
    rbac([UserRoles.INSTRUCTOR, UserRoles.ADMIN]),
    validateRequest({ params: validMongoIdSchema("courseId") }),
    deleteCourseById
  )
  .patch(
    verifyJwt,
    rbac([UserRoles.INSTRUCTOR, UserRoles.ADMIN]),
    validateRequest({
      params: validMongoIdSchema("courseId"),
      body: updateCourseSchema,
    }),
    updateCourseById
  );

courseRouter
  .route("/:courseId/publish")
  .patch(
    verifyJwt,
    rbac([UserRoles.INSTRUCTOR, UserRoles.ADMIN]),
    validateRequest({ params: validMongoIdSchema("courseId") }),
    publishCourseById
  );

courseRouter
  .route("/:courseId/draft")
  .patch(
    verifyJwt,
    rbac([UserRoles.INSTRUCTOR, UserRoles.ADMIN]),
    validateRequest({ params: validMongoIdSchema("courseId") }),
    draftCourseById
  );

export { courseRouter };
