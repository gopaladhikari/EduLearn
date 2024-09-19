import { Router } from "express";

import { registerUser } from "../../controllers/user/user.controller";

const userRouter = Router();

userRouter.route("/register").post(registerUser);

export { userRouter };
