import { Router } from "express";

import { registerUser } from "../../controllers/customer/customer.controller";

const userRouter = Router();

userRouter.route("/register").post(registerUser);

export { userRouter };
