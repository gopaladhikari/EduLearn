import {
  createInstructorApplication,
  deleteInstructorApplication,
  updateInstructorApplication,
  getAllInstructorApplication,
  getInstructorApplicationById,
  getInstructorApplicationsbByStudentId,
} from "@/controllers/instructor-application.controller.js";
import { rbac } from "@/middlewares/rbac.middleware.js";
import { validateRequest } from "@/middlewares/validator.middleware.js";
import {
  instructorApplicationSchema,
  updateInstructorApplicationSchema,
} from "@/schemas/instructor-application.schema.js";
import { validateMongoId } from "@/schemas/validate-mongo-id.js";
import { UserRoles } from "@/utils/constants.js";
import { Router } from "express";
import passport from "passport";

const instructorApplicationRouter = Router();

const verifyJwt = passport.authenticate("jwt", { session: false });

instructorApplicationRouter.use(verifyJwt);

instructorApplicationRouter
  .route("/")
  .get(rbac([UserRoles.ADMIN]), getAllInstructorApplication)
  .post(
    rbac([UserRoles.STUDENT]),
    validateRequest({ body: instructorApplicationSchema }),
    createInstructorApplication
  );

instructorApplicationRouter.route("/student/:studentId").get(
  rbac([UserRoles.ADMIN]),
  validateRequest({
    params: validateMongoId("studentId"),
  }),
  getInstructorApplicationsbByStudentId
);

instructorApplicationRouter
  .route("/:applicationId")
  .get(
    rbac([UserRoles.ADMIN]),
    validateRequest({
      params: validateMongoId("applicationId"),
    }),
    getInstructorApplicationById
  )
  .patch(
    rbac([UserRoles.ADMIN]),
    validateRequest({
      params: validateMongoId("applicationId"),
      body: updateInstructorApplicationSchema,
    }),
    updateInstructorApplication
  )
  .delete(
    rbac([UserRoles.ADMIN]),
    validateRequest({
      params: validateMongoId("applicationId"),
    }),
    deleteInstructorApplication
  );

export { instructorApplicationRouter };
