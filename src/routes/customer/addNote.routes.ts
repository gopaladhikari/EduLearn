import { Router } from "express";
import {
  createNote,
  deleteAddNotes,
  getNotes,
  updateNote,
} from "../../controllers/customer/addNotes.controller";
import { verifyJWT } from "../../middlewares/auth.middleware";

const addNoteRouter = Router();

addNoteRouter.route("/get/:courseId").get(verifyJWT, getNotes);
addNoteRouter.route("/create/:courseId").post(verifyJWT, createNote);
addNoteRouter.route("/update/:noteId").put(verifyJWT, updateNote);
addNoteRouter.route("/delete/:noteId").delete(verifyJWT, deleteAddNotes);

export { addNoteRouter };
