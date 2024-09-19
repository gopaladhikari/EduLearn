import { Router } from "express";
import { cartRouter } from "./cart.routes";

const customerRouter = Router();

customerRouter.use("/cart", cartRouter);

export { customerRouter };
