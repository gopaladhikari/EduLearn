import { Router } from "express";
import {
  createUserDetails,
  deleteUserDetails,
  updateUserDetails,
  getUserDetailsById,
} from "../../controllers/customer/customerDetails.controller";
import { verifyJwt } from "../../middlewares/verifyJwt";

const customerDetailsRouter = Router();

customerDetailsRouter.route("/").get(verifyJwt, getUserDetailsById);
customerDetailsRouter.route("/create").post(verifyJwt, createUserDetails);

customerDetailsRouter
  .route("/update/:userDetailId")
  .put(verifyJwt, updateUserDetails);

customerDetailsRouter
  .route("/delete/:userDetailId")
  .delete(verifyJwt, deleteUserDetails);

export { customerDetailsRouter };
