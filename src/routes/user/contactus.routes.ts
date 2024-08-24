import { Router } from "express";
import { createContactUs } from "../../controllers/user/contactUs.controller";

const contactUsRouter = Router();

contactUsRouter.route("/").post(createContactUs);

export { contactUsRouter };
