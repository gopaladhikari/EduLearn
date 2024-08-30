import { Router } from "express";
import {
  createCurrentPursuing,
  deleteCurrentPursuing,
  getAllCurrentPursuings,
  getCurrentPursuingById,
  updateCurrentPursuing,
} from "../../controllers/admin/currentPursuing.controller";
import { verifyJWT } from "../../middlewares/auth.middleware";

const currentPursuingRouter = Router();

currentPursuingRouter.route("/").get(verifyJWT, getAllCurrentPursuings);

currentPursuingRouter.route("/").post(verifyJWT, createCurrentPursuing);

currentPursuingRouter
  .route("/:currentPursuingId")
  .get(verifyJWT, getCurrentPursuingById);

currentPursuingRouter
  .route("/update/:currentPursuingId")
  .put(verifyJWT, updateCurrentPursuing);

currentPursuingRouter
  .route("/delete/:currentPursuingId")
  .delete(verifyJWT, deleteCurrentPursuing);

export { currentPursuingRouter };
