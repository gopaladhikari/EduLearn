import { isValidObjectId } from "mongoose";
import { Cart } from "../../models/user/cart.model";
import { ApiError, ApiSuccess } from "../../utils/apiResponse";
import { dbHandler } from "../../utils/dbHandler";

export const createCart = dbHandler(async (req, res) => {
  const userId = req.user?._id;
  const mainCourseId = req.params.mainCourseId;
  const { quantity } = req.body;

  if (!isValidObjectId(mainCourseId)) throw new ApiError("Invalid id");

  if (!quantity) throw new ApiError("Quantity is required");

  const existingCart = await Cart.findOne({ userId });

  if (existingCart) {
    const courseIndex = existingCart.courses.findIndex(
      (course) => course.mainCourseId.toString() === mainCourseId
    );

    if (courseIndex === -1)
      existingCart.courses.push({ mainCourseId, quantity });
    else existingCart.courses[courseIndex].quantity = quantity;

    await existingCart.save();
    return res
      .status(200)
      .json(new ApiSuccess("Cart updated successfully", existingCart));
  }

  const cart = await Cart.create({
    userId,
    courses: [{ mainCourseId, quantity }],
  });

  if (!cart) throw new ApiError("Cart not created");

  res.status(201).json(new ApiSuccess("Cart created successfully", cart));
});

export const getCart = dbHandler(async (req, res) => {
  const userId = req.user?._id;

  const cart = await Cart.findOne({ userId }).populate("courses");

  if (!cart) throw new ApiError("Cart not found");

  res.status(200).json(new ApiSuccess("Cart fetched successfully", cart));
});

export const updateCart = dbHandler(async (req, res) => {
  const userId = req.user?._id;
  const mainCourseId = req.params.mainCourseId;
  const { quantity } = req.body;

  if (!isValidObjectId(mainCourseId))
    throw new ApiError("Invalid main course id");

  if (!quantity) throw new ApiError("Quantity is required");

  const existingCart = await Cart.findOne({ userId });

  if (!existingCart) throw new ApiError("Cart not found");

  const courseIndex = existingCart.courses.findIndex(
    (course) => course.mainCourseId.toString() === mainCourseId
  );

  if (courseIndex === -1) throw new ApiError("Course not found");

  existingCart.courses[courseIndex].quantity = quantity;

  await existingCart.save();

  res
    .status(200)
    .json(new ApiSuccess("Cart updated successfully", existingCart));
});

export const deleteCourseFromCart = dbHandler(async (req, res) => {
  const userId = req.user?._id;
  const mainCourseId = req.params.mainCourseId;

  if (!isValidObjectId(mainCourseId))
    throw new ApiError("Invalid main course id");

  const cart = await Cart.findOne({ userId });

  if (!cart) throw new ApiError("Cart not found");

  cart.courses.pull({ mainCourseId });

  await cart.save({ validateBeforeSave: false });

  res.status(200).json(new ApiSuccess("Cart updated successfully", cart));
});

export const clearCart = dbHandler(async (req, res) => {
  const cartId = req.params.cartId;

  if (!isValidObjectId(cartId)) throw new ApiError("Invalid id");

  const cart = await Cart.findByIdAndDelete(cartId);

  if (!cart) throw new ApiError("Cart not found");

  res.status(200).json(new ApiSuccess("Cart deleted successfully", cart));
});
