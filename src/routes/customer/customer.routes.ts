import { Router } from "express";

import {
  getCustomer,
  loginUser,
  registerUser,
} from "../../controllers/customer/customer.controller";
import { verifyCustomer } from "../../middlewares/customer.middleware";

const userRouter = Router();

// public routes
userRouter.route("/register").post(registerUser);
userRouter.route("/login").post(loginUser);

// secured routes

userRouter.route("/").get(verifyCustomer, getCustomer);

export { userRouter };
