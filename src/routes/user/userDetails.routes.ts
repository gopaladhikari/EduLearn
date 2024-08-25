import { Router } from "express";
import {
  createUserDetails,
  deleteUserDetails,
  updateUserDetails,
  getUserDetailsById,
} from "../../controllers/user/userDetails.controller";

const userDetailsRouter = Router();

userDetailsRouter.route("/").post(createUserDetails);

userDetailsRouter.route("/:userId").get(getUserDetailsById);

userDetailsRouter.route("/update/:userId").put(updateUserDetails);

userDetailsRouter.route("/delete/:userId").delete(deleteUserDetails);

export { userDetailsRouter };
