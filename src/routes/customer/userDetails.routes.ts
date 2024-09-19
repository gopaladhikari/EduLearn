import { Router } from "express";
import {
  createUserDetails,
  deleteUserDetails,
  updateUserDetails,
  getUserDetailsById,
} from "../../controllers/customer/userDetails.controller";
import { verifyJWT } from "../../middlewares/auth.middleware";

const userDetailsRouter = Router();

userDetailsRouter.route("/create").post(verifyJWT, createUserDetails);

userDetailsRouter.route("/get").get(verifyJWT, getUserDetailsById);

userDetailsRouter
  .route("/update/:userDetailId")
  .put(verifyJWT, updateUserDetails);

userDetailsRouter
  .route("/delete/:userDetailId")
  .delete(verifyJWT, deleteUserDetails);

export { userDetailsRouter };
