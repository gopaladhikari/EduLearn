import { Router } from "express";
import {
  addWishlist,
  deleteWishlist,
  getWishlist,
  clearWishlist,
} from "../../controllers/customer/wishtlist.controller";
import { verifyJwt } from "../../middlewares/verifyJwt.middleware";

const wishlistRouter = Router();

wishlistRouter.route("/get").get(verifyJwt, getWishlist);
wishlistRouter.route("/create/:courseId").post(verifyJwt, addWishlist);
wishlistRouter
  .route("/delete/:wishlistId")
  .post(verifyJwt, deleteWishlist);
wishlistRouter.route("/clear-wishlist").delete(verifyJwt, clearWishlist);

export { wishlistRouter };
