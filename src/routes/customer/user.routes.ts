import { Router } from "express";

import {
  loginUser,
  registerUser,
} from "../../controllers/customer/users.controller";

const userRouter = Router();

userRouter.route("/register").post(registerUser);
userRouter.route("/login").post(loginUser);

export { userRouter };
