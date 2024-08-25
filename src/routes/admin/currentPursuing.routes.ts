import { Router } from "express";
import {
  createCurrentPursuing,
  deleteCurrentPursuing,
  getAllCurrentPursuings,
  getCurrentPursuingById,
  updateCurrentPursuing,
} from "../../controllers/admin/currentPursuing.controller";

const currentPursuingRouter = Router();

currentPursuingRouter.route("/").get(getAllCurrentPursuings);

currentPursuingRouter.route("/").post(createCurrentPursuing);

currentPursuingRouter
  .route("/:currentPursuingId")
  .get(getCurrentPursuingById);

currentPursuingRouter
  .route("/update/:currentPursuingId")
  .put(updateCurrentPursuing);

currentPursuingRouter
  .route("/delete/:currentPursuingId")
  .delete(deleteCurrentPursuing);

export { currentPursuingRouter };
