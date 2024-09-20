import { Router } from "express";

import {
  getCustomer,
  loginUser,
  registerUser,
} from "../../controllers/customer/customer.controller";
import { verifyJWT } from "../../middlewares/auth.middleware";

const userRouter = Router();

// public routes
userRouter.route("/register").post(registerUser);
userRouter.route("/login").post(loginUser);

// secured routes

userRouter.route("/").get(verifyJWT, getCustomer);

export { userRouter };
