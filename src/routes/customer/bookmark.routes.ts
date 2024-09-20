import { Router } from "express";
import {
  getBookmarks,
  addBookmark,
  deleteBookmark,
} from "../../controllers/customer/bookmark.controller";
import { verifyJwt } from "../../middlewares/verifyJwt";

const bookmarkRouter = Router();

bookmarkRouter.route("/get").get(verifyJwt, getBookmarks);

bookmarkRouter.route("/create").post(verifyJwt, addBookmark);

bookmarkRouter
  .route("/delete/:bookmarkId")
  .delete(verifyJwt, deleteBookmark);

export { bookmarkRouter };
