import { Router } from "express";
import {
  createNote,
  deleteAddNotes,
  getNotes,
  updateNote,
} from "../../controllers/customer/addNotes.controller";
import { verifyCustomer } from "../../middlewares/customer.middleware";

const addNoteRouter = Router();

addNoteRouter.route("/get/:courseId").get(verifyCustomer, getNotes);
addNoteRouter.route("/create/:courseId").post(verifyCustomer, createNote);
addNoteRouter.route("/update/:noteId").put(verifyCustomer, updateNote);
addNoteRouter
  .route("/delete/:noteId")
  .delete(verifyCustomer, deleteAddNotes);

export { addNoteRouter };
