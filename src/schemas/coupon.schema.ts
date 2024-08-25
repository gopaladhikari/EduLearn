import z from "zod";

export const couponSchema = z.object({
  couponCode: z
    .string({
      required_error: "Coupon code is required!",
      invalid_type_error: "Coupon code must be a string!",
    })
    .min(6, {
      message: "Coupon code should be between 6 and 12 characters!",
    })
    .max(12, {
      message: "Coupon code should be between 6 and 12 characters!",
    }),

  discount: z
    .number({
      required_error: "Discount is required!",
      invalid_type_error: "Discount must be a number!",
    })
    .min(1, { message: "Discount should be greater than 0!" }),
  description: z.string({
    required_error: "Description is required!",
    invalid_type_error: "Description must be a string!",
  }),
});
