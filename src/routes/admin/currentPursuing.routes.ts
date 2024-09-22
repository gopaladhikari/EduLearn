import { Router } from "express";

import {
  createCurrentPursuing,
  deleteCurrentPursuing,
  getAllCurrentPursuing,
  updateCurrentPursuing,
} from "../../controllers/admin/currentPursuing.controller";
import { verifyJwt } from "../../middlewares/verifyJwt";

const currentPursuingRouter = Router();

currentPursuingRouter.route("/").get(verifyJwt, getAllCurrentPursuing);

currentPursuingRouter
  .route("/create")
  .post(verifyJwt, createCurrentPursuing);

currentPursuingRouter
  .route("/update/:currentPursuingId")
  .put(verifyJwt, updateCurrentPursuing);

currentPursuingRouter
  .route("/delete/:currentPursuingId")
  .delete(verifyJwt, deleteCurrentPursuing);

export { currentPursuingRouter };
