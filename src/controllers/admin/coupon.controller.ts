import { Coupon } from "../../models/admin/coupons.model";
import { ApiError, ApiSuccess } from "../../utils/apiResponse";
import { dbHandler } from "../../utils/dbHandler";
import { couponSchema } from "../../schemas/coupon.schema";
import { isValidObjectId } from "mongoose";

export const createCoupon = dbHandler(async (req, res) => {
  const { success, data, error } = couponSchema.safeParse(req.body);

  if (!success) throw new ApiError(error.message);

  const newCoupon = await Coupon.create({
    couponCode: data.couponCode,
    discount: data.discount,
    description: data.description,
  });

  if (!newCoupon) throw new ApiError("Coupon not created!");

  res
    .status(201)
    .json(new ApiSuccess("Coupon created successfully!", newCoupon));
});

export const getAllCoupons = dbHandler(async (_, res) => {
  const coupons = await Coupon.find();

  if (!coupons.length) throw new ApiError("Coupons not found!");

  res
    .status(200)
    .json(new ApiSuccess("Coupons fetched successfully!", coupons));
});

export const updateCoupon = dbHandler(async (req, res) => {
  const couponId = req.params.couponId;

  if (!isValidObjectId(couponId)) throw new ApiError("Invalid coupon id!");

  const { data, success, error } = couponSchema.safeParse(req.body);

  if (!success) throw new ApiError(error.message);

  const coupon = await Coupon.findByIdAndUpdate(couponId, {
    couponCode: data.couponCode,
    discount: data.discount,
    description: data.description,
  });

  if (!coupon) throw new ApiError("Coupon not found!");

  res
    .status(200)
    .json(new ApiSuccess("Coupon updated successfully!", coupon));
});

export const deleteCoupon = dbHandler(async (req, res) => {
  const couponId = req.params.couponId;

  if (!isValidObjectId(couponId)) throw new ApiError("Invalid coupon id!");

  const coupon = await Coupon.findByIdAndDelete(couponId);

  if (!coupon) throw new ApiError("Coupon not found!");

  return res
    .status(200)
    .json(new ApiSuccess("Coupon deleted successfully!", coupon));
});
