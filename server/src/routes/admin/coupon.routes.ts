import { Router } from "express";

const couponRouter = Router();

import {
  updateCoupon,
  deleteCoupon,
  createCoupon,
  getAllCoupons,
} from "../../controllers/admin/coupon.controller";
import { verifyJwt } from "../../middlewares/verifyJwt.middleware";

couponRouter.route("/get").get(verifyJwt, getAllCoupons);

couponRouter.route("/create").post(verifyJwt, createCoupon);

couponRouter.route("/update/:couponId").put(verifyJwt, updateCoupon);

couponRouter.route("/delete/:couponId").delete(verifyJwt, deleteCoupon);

export { couponRouter };
