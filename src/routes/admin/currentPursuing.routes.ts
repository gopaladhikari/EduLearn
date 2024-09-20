import { Router } from "express";
import {
  createCurrentPursuing,
  deleteCurrentPursuing,
  getAllCurrentPursuings,
  getCurrentPursuingById,
  updateCurrentPursuing,
} from "../../controllers/admin/currentPursuing.controller";
import { verifyJwt } from "../../middlewares/verifyJwt";

const currentPursuingRouter = Router();

currentPursuingRouter.route("/").get(verifyJwt, getAllCurrentPursuings);

currentPursuingRouter.route("/").post(verifyJwt, createCurrentPursuing);

currentPursuingRouter
  .route("/:currentPursuingId")
  .get(verifyJwt, getCurrentPursuingById);

currentPursuingRouter
  .route("/update/:currentPursuingId")
  .put(verifyJwt, updateCurrentPursuing);

currentPursuingRouter
  .route("/delete/:currentPursuingId")
  .delete(verifyJwt, deleteCurrentPursuing);

export { currentPursuingRouter };
