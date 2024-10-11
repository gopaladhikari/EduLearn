import { Router } from "express";

import {
  createSubject,
  deleteSubject,
  getAllSubject,
  updateSubject,
} from "../../controllers/admin/subject.controller";
import { verifyJwt } from "../../middlewares/verifyJwt.middleware";
import { upload } from "../../middlewares/multer.middleware";

const subjectRouter = Router();

subjectRouter.route("/:semesterId").get(verifyJwt, getAllSubject);

subjectRouter
  .route("/create/:semesterId")
  .post(verifyJwt, upload.single("logo"), createSubject);

subjectRouter
  .route("/update/:subjectId")
  .put(verifyJwt, upload.single("logo"), updateSubject);

subjectRouter.route("/delete/:subjectId").delete(verifyJwt, deleteSubject);

export { subjectRouter };
