import { Router } from "express";

const couponRouter = Router();

import {
  updateCoupon,
  deleteCoupon,
  createCoupon,
  getAllCoupons,
} from "../../controllers/admin/coupon.controller";
import { verifyJWT } from "../../middlewares/auth.middleware";

couponRouter.route("/get").get(verifyJWT, getAllCoupons);

couponRouter.route("/create").post(verifyJWT, createCoupon);

couponRouter.route("/update/:couponId").put(verifyJWT, updateCoupon);

couponRouter.route("/delete/:couponId").delete(verifyJWT, deleteCoupon);

export { couponRouter };
