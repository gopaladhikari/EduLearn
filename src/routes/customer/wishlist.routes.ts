import { Router } from "express";
import {
  addWishlist,
  deleteWishlist,
  getWishlist,
  clearWishlist,
} from "../../controllers/customer/wishtlist.controller";
import { verifyCustomer } from "../../middlewares/customer.middleware";

const wishlistRouter = Router();

wishlistRouter.route("/get").get(verifyCustomer, getWishlist);
wishlistRouter
  .route("/create/:courseId")
  .post(verifyCustomer, addWishlist);
wishlistRouter
  .route("/delete/:wishlistId")
  .post(verifyCustomer, deleteWishlist);
wishlistRouter
  .route("/clear-wishlist")
  .delete(verifyCustomer, clearWishlist);

export { wishlistRouter };
