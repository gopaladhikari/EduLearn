import { Router } from "express";
import { verifyCustomer } from "../../middlewares/customer.middleware";

import {
  createCart,
  getCart,
  updateCart,
  deleteCourseFromCart,
  clearCart,
} from "../../controllers/customer/cart.controller";

const cartRouter = Router();

cartRouter.route("/create").post(verifyCustomer, createCart);
cartRouter.route("/get").get(verifyCustomer, getCart);
cartRouter.route("/update/:mainCourseId").put(verifyCustomer, updateCart);
cartRouter
  .route("/delete/:mainCourseId")
  .delete(verifyCustomer, deleteCourseFromCart);
cartRouter.route("/clear/:cartId").delete(verifyCustomer, clearCart);

export { cartRouter };
