import { Router } from "express";

const couponRouter = Router();

import {
  updateCoupon,
  deleteCoupon,
  createCoupon,
  getAllCoupons,
} from "../../controllers/admin/coupon.controller";
import { verifyCustomer } from "../../middlewares/customer.middleware";

couponRouter.route("/get").get(verifyCustomer, getAllCoupons);

couponRouter.route("/create").post(verifyCustomer, createCoupon);

couponRouter.route("/update/:couponId").put(verifyCustomer, updateCoupon);

couponRouter
  .route("/delete/:couponId")
  .delete(verifyCustomer, deleteCoupon);

export { couponRouter };
