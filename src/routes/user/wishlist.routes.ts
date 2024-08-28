import { Router } from "express";
import {
  addWishlist,
  deleteWishlist,
  getWishlist,
  clearWishlist,
} from "../../controllers/user/wishtlist.controller";
import { verifyJWT } from "../../middlewares/auth.middleware";

const wishlistRouter = Router();

wishlistRouter.route("/get").get(verifyJWT, getWishlist);
wishlistRouter.route("/create/:courseId").post(verifyJWT, addWishlist);
wishlistRouter
  .route("/delete/:wishlistId")
  .post(verifyJWT, deleteWishlist);
wishlistRouter.route("/clear-wishlist").delete(verifyJWT, clearWishlist);

export { wishlistRouter };
