import { Router } from "express";
import { cartRouter } from "./cart.routes";
import { userRouter } from "./customer.routes";
import { customerDetailsRouter } from "./customerDetails.routes";

const customerRouter = Router();

customerRouter.use("/", userRouter);
customerRouter.use("/user-details", customerDetailsRouter);
customerRouter.use("/cart", cartRouter);

export { customerRouter };
