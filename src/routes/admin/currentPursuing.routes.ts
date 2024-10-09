import { Router } from "express";

import {
  createCurrentPursuingByUniversityId,
  deleteCurrentPursuing,
  getAllCurrentPursuingByUniversityId,
  updateCurrentPursuing,
} from "../../controllers/admin/currentPursuing.controller";
import { verifyJwt } from "../../middlewares/verifyJwt";

const currentPursuingRouter = Router();

currentPursuingRouter
  .route("/:universityId")
  .get(verifyJwt, getAllCurrentPursuingByUniversityId);

currentPursuingRouter
  .route("/create/:universityId")
  .post(verifyJwt, createCurrentPursuingByUniversityId);

currentPursuingRouter
  .route("/update/:currentPursuingId")
  .put(verifyJwt, updateCurrentPursuing);

currentPursuingRouter
  .route("/delete/:currentPursuingId")
  .delete(verifyJwt, deleteCurrentPursuing);

export { currentPursuingRouter };
