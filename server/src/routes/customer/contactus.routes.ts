import { Router } from "express";
import { createContactUs } from "../../controllers/customer/contactUs.controller";

const contactUsRouter = Router();

contactUsRouter.route("/").post(createContactUs);

export { contactUsRouter };
