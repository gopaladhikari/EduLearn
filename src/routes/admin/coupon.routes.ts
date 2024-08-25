import { Router } from "express";

const couponRouter = Router();

import {
  updateCoupon,
  deleteCoupon,
  createCoupon,
  getAllCoupons,
} from "../../controllers/admin/coupon.controller";

couponRouter.get("/get-coupon", getAllCoupons);
couponRouter.post("/add-coupon", createCoupon);
couponRouter.put("/update-coupon", updateCoupon);
couponRouter.delete("/delete-coupon", deleteCoupon);

export { couponRouter };
