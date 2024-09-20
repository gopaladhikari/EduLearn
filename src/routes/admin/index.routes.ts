import { Router } from "express";
import { adminRouter } from "./admin.routes";
import { universityRouter } from "./university.routes";
import { storyRouter } from "./story.routes";

const mainAdminRouter = Router();

mainAdminRouter.use("/", adminRouter);
mainAdminRouter.use("/university", universityRouter);
mainAdminRouter.use("/story", storyRouter);

export { mainAdminRouter };
