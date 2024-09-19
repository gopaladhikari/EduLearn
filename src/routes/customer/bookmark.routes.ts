import { Router } from "express";
import {
  getBookmarks,
  addBookmark,
  deleteBookmark,
} from "../../controllers/customer/bookmark.controller";
import { verifyJWT } from "../../middlewares/auth.middleware";

const bookmarkRouter = Router();

bookmarkRouter.route("/get").get(verifyJWT, getBookmarks);

bookmarkRouter.route("/create").post(verifyJWT, addBookmark);

bookmarkRouter
  .route("/delete/:bookmarkId")
  .delete(verifyJWT, deleteBookmark);

export { bookmarkRouter };
