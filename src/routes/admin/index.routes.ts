import { Router } from "express";
import { adminRouter } from "./admin.routes";

const mainAdminRouter = Router();

mainAdminRouter.use("/", adminRouter);

export { mainAdminRouter };
