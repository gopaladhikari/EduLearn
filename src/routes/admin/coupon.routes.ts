import { Router } from "express";

const couponRouter = Router();

import {
  updateCoupon,
  deleteCoupon,
  createCoupon,
  getAllCoupons,
} from "../../controllers/admin/coupon.controller";

couponRouter.get("/", getAllCoupons);
couponRouter.post("/", createCoupon);
couponRouter.put("/update/:couponId", updateCoupon);
couponRouter.delete("/delete/:couponId", deleteCoupon);

export { couponRouter };
