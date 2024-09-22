import { Router } from "express";

import {
  createSubject,
  deleteSubject,
  getAllSubject,
  updateSubject,
} from "../../controllers/admin/subject.controller";
import { verifyJwt } from "../../middlewares/verifyJwt";
import { upload } from "../../middlewares/multer.middleware";

const subjectRouter = Router();

subjectRouter.route("/").get(verifyJwt, getAllSubject);

subjectRouter
  .route("/create")
  .post(verifyJwt, upload.single("logo"), createSubject);

subjectRouter.route("/update/:subjectId").put(verifyJwt, updateSubject);

subjectRouter.route("/delete/:subjectId").delete(verifyJwt, deleteSubject);

export { subjectRouter };
