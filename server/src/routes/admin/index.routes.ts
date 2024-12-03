import { Router } from "express";
import { adminRouter } from "./admin.routes";
import { universityRouter } from "./university.routes";
import { storyRouter } from "./story.routes";
import { semesterRouter } from "./semester.routes";
import { subjectRouter } from "./subject.routes";
import { currentPursuingRouter } from "./currentPursuing.routes";
import { adminCoursesRoutes } from "./courses.routes";

const mainAdminRouter = Router();

mainAdminRouter.use("/", adminRouter);
mainAdminRouter.use("/university", universityRouter);
mainAdminRouter.use("/current-pursuing", currentPursuingRouter);
mainAdminRouter.use("/semester", semesterRouter);
mainAdminRouter.use("/subject", subjectRouter);
mainAdminRouter.use("/story", storyRouter);
mainAdminRouter.use("/courses", adminCoursesRoutes);

export { mainAdminRouter };
