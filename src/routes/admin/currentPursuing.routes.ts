import { Router } from "express";
import {
  createCurrentPursuing,
  deleteCurrentPursuing,
  getAllCurrentPursuings,
  getCurrentPursuingById,
  updateCurrentPursuing,
} from "../../controllers/admin/currentPursuing.controller";
import { verifyCustomer } from "../../middlewares/customer.middleware";

const currentPursuingRouter = Router();

currentPursuingRouter
  .route("/")
  .get(verifyCustomer, getAllCurrentPursuings);

currentPursuingRouter
  .route("/")
  .post(verifyCustomer, createCurrentPursuing);

currentPursuingRouter
  .route("/:currentPursuingId")
  .get(verifyCustomer, getCurrentPursuingById);

currentPursuingRouter
  .route("/update/:currentPursuingId")
  .put(verifyCustomer, updateCurrentPursuing);

currentPursuingRouter
  .route("/delete/:currentPursuingId")
  .delete(verifyCustomer, deleteCurrentPursuing);

export { currentPursuingRouter };
