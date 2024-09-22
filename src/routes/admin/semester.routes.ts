import { Router } from "express";

import {
  createSemester,
  deleteSemester,
  getAllSemester,
  updateSemester,
} from "../../controllers/admin/semester.controller";
import { verifyJwt } from "../../middlewares/verifyJwt";

const semesterRouter = Router();

semesterRouter.route("/").get(verifyJwt, getAllSemester);

semesterRouter.route("/create").post(verifyJwt, createSemester);

semesterRouter.route("/update/:semesterId").put(verifyJwt, updateSemester);

semesterRouter
  .route("/delete/:semesterId")
  .delete(verifyJwt, deleteSemester);

export { semesterRouter };
