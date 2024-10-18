import { Router } from "express";
import {
  createNote,
  deleteAddNotes,
  getNotes,
  updateNote,
} from "../../controllers/customer/addNotes.controller";
import { verifyJwt } from "../../middlewares/verifyJwt.middleware";

const addNoteRouter = Router();

addNoteRouter.route("/get/:courseId").get(verifyJwt, getNotes);
addNoteRouter.route("/create/:courseId").post(verifyJwt, createNote);
addNoteRouter.route("/update/:noteId").put(verifyJwt, updateNote);
addNoteRouter.route("/delete/:noteId").delete(verifyJwt, deleteAddNotes);

export { addNoteRouter };
