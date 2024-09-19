import { Router } from "express";
import { verifyJWT } from "../../middlewares/auth.middleware";

import {
  createCart,
  getCart,
  updateCart,
  deleteCourseFromCart,
  clearCart,
} from "../../controllers/customer/cart.controller";

const cartRouter = Router();

cartRouter.route("/create").post(verifyJWT, createCart);
cartRouter.route("/get").get(verifyJWT, getCart);
cartRouter.route("/update/:mainCourseId").put(verifyJWT, updateCart);
cartRouter
  .route("/delete/:mainCourseId")
  .delete(verifyJWT, deleteCourseFromCart);
cartRouter.route("/clear/:cartId").delete(verifyJWT, clearCart);

export { cartRouter };
