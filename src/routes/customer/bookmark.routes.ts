import { Router } from "express";
import {
  getBookmarks,
  addBookmark,
  deleteBookmark,
} from "../../controllers/customer/bookmark.controller";
import { verifyCustomer } from "../../middlewares/customer.middleware";

const bookmarkRouter = Router();

bookmarkRouter.route("/get").get(verifyCustomer, getBookmarks);

bookmarkRouter.route("/create").post(verifyCustomer, addBookmark);

bookmarkRouter
  .route("/delete/:bookmarkId")
  .delete(verifyCustomer, deleteBookmark);

export { bookmarkRouter };
