import { Router } from "express";

import { registerUser } from "../../controllers/customer/users.controller";

const userRouter = Router();

userRouter.route("/register").post(registerUser);

export { userRouter };
