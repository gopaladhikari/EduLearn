import { Router } from "express";
import { cartRouter } from "./cart.routes";
import { userRouter } from "./user.routes";

const customerRouter = Router();

customerRouter.use("/", userRouter);
customerRouter.use("/", cartRouter);

export { customerRouter };
