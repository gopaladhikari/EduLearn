import { Router } from "express";
import { verifyJwt } from "../../middlewares/verifyJwt.middleware";

import {
  createCart,
  getCart,
  updateCart,
  deleteCourseFromCart,
  clearCart,
} from "../../controllers/customer/cart.controller";

const cartRouter = Router();

cartRouter.route("/create").post(verifyJwt, createCart);
cartRouter.route("/get").get(verifyJwt, getCart);
cartRouter.route("/update/:mainCourseId").put(verifyJwt, updateCart);
cartRouter
  .route("/delete/:mainCourseId")
  .delete(verifyJwt, deleteCourseFromCart);
cartRouter.route("/clear/:cartId").delete(verifyJwt, clearCart);

export { cartRouter };
