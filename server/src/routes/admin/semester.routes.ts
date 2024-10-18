import { Router } from "express";

import {
  createSemesterByCurrentPursuingId,
  deleteSemester,
  getAllSemesterByCurrentPursuingId,
  updateSemester,
} from "../../controllers/admin/semester.controller";
import { verifyJwt } from "../../middlewares/verifyJwt.middleware";

const semesterRouter = Router();

semesterRouter
  .route("/:currentPursuingId")
  .get(verifyJwt, getAllSemesterByCurrentPursuingId);

semesterRouter
  .route("/create/:currentPursuingId")
  .post(verifyJwt, createSemesterByCurrentPursuingId);

semesterRouter.route("/update/:semesterId").put(verifyJwt, updateSemester);

semesterRouter
  .route("/delete/:semesterId")
  .delete(verifyJwt, deleteSemester);

export { semesterRouter };
