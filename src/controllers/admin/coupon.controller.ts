import { Coupon } from "../../models/admin/coupons.model";
import { ApiError, ApiSuccess } from "../../utils/apiResponse";
import { dbHandler } from "../../utils/dbHandler";

export const createCoupon = dbHandler(async (req, res) => {
  const couponCode = req.body.couponCode;
  const discount = req.body.discount;
  const expiryDate = req.body.expiryDate;
  const isActive = req.body.isActive;

  if (!couponCode || !discount || !expiryDate || !isActive)
    throw new ApiError(
      "Coupon code, discount, expiry date and isActive are required!"
    );

  const newCoupon = await Coupon.create({
    couponCode,
    discount,
    expiryDate,
    isActive,
  });

  if (!newCoupon) throw new ApiError("Coupon not created!");

  res
    .status(201)
    .json(new ApiSuccess("Coupon created successfully!", newCoupon));
});

export const getAllCoupons = dbHandler(async (req, res) => {
  const coupons = await Coupon.find({
    isDeleted: false,
  });

  if (!coupons.length) throw new ApiError("Coupons not found!");

  return res
    .status(200)
    .json(new ApiSuccess("Coupons fetched successfully!", coupons));
});

export const getCouponById = dbHandler(async (req, res) => {
  const couponId = req.params.couponId;

  if (!couponId) throw new ApiError("Coupon id is required!");

  const coupon = await Coupon.findById(couponId);

  if (!coupon || coupon.isDeleted) throw new ApiError("Coupon not found!");

  return res
    .status(200)
    .json(new ApiSuccess("Coupon fetched successfully!", coupon));
});

export const updateCoupon = dbHandler(async (req, res) => {
  const couponId = req.params.couponId;

  if (!couponId) throw new ApiError("Coupon id is required!");

  const coupon = await Coupon.findById(couponId);

  if (!coupon || coupon.isDeleted) throw new ApiError("Coupon not found!");

  const { name, description, discount, isActive } = req.body;

  if (!name || !description || !discount || !isActive)
    throw new ApiError(
      "Name, description, discount and isActive are required!"
    );

  coupon.name = name;
  coupon.description = description;
  coupon.discount = discount;
  coupon.isActive = isActive;

  await coupon.save();

  return res
    .status(200)
    .json(new ApiSuccess("Coupon updated successfully!", coupon));
});

export const deleteCoupon = dbHandler(async (req, res) => {
  const couponId = req.params.couponId;

  if (!couponId) throw new ApiError("Coupon id is required!");

  const coupon = await Coupon.findByIdAndUpdate(couponId, {
    isDeleted: true,
  });

  if (!coupon || coupon.isDeleted) throw new ApiError("Coupon not found!");

  return res
    .status(200)
    .json(new ApiSuccess("Coupon deleted successfully!", coupon));
});
