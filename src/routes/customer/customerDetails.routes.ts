import { Router } from "express";
import {
  createUserDetails,
  deleteUserDetails,
  updateUserDetails,
  getUserDetailsById,
} from "../../controllers/customer/customerDetails.controller";
import { verifyJWT } from "../../middlewares/auth.middleware";

const customerDetailsRouter = Router();

customerDetailsRouter.route("/create").post(verifyJWT, createUserDetails);

customerDetailsRouter.route("/").get(verifyJWT, getUserDetailsById);

customerDetailsRouter
  .route("/update/:userDetailId")
  .put(verifyJWT, updateUserDetails);

customerDetailsRouter
  .route("/delete/:userDetailId")
  .delete(verifyJWT, deleteUserDetails);

export { customerDetailsRouter };
