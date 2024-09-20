import { Router } from "express";
import {
  createUserDetails,
  deleteUserDetails,
  updateUserDetails,
  getUserDetailsById,
} from "../../controllers/customer/customerDetails.controller";
import { verifyCustomer } from "../../middlewares/customer.middleware";

const customerDetailsRouter = Router();

customerDetailsRouter.route("/").get(verifyCustomer, getUserDetailsById);
customerDetailsRouter
  .route("/create")
  .post(verifyCustomer, createUserDetails);

customerDetailsRouter
  .route("/update/:userDetailId")
  .put(verifyCustomer, updateUserDetails);

customerDetailsRouter
  .route("/delete/:userDetailId")
  .delete(verifyCustomer, deleteUserDetails);

export { customerDetailsRouter };
