import { Router } from "express";

import {
  getCustomer,
  loginUser,
  registerUser,
  updateCustomer,
} from "../../controllers/customer/customer.controller";
import { verifyJwt } from "../../middlewares/verifyJwt.middleware";

const userRouter = Router();

// public routes
userRouter.route("/register").post(registerUser);
userRouter.route("/login").post(loginUser);

// secured routes

userRouter.route("/").get(verifyJwt, getCustomer);
userRouter.route("/update").put(verifyJwt, updateCustomer);

export { userRouter };
