import { Router } from "express";
import {
  getAddNotes,
  addAddNotes,
} from "../../controllers/user/addNotes.controller";
import { verifyJWT } from "../../middlewares/auth.middleware";

const addNoteRouter = Router();

addNoteRouter.route("/:courseId").get(verifyJWT, getAddNotes);
addNoteRouter.route("/:courseId").post(verifyJWT, addAddNotes);

export { addNoteRouter };
