import mongoose from "mongoose";

const couponSchema = new mongoose.Schema(
  {
    couponCode: {
      type: String,
      required: true,
      unique: true,
    },

    couponDescription: {
      type: String,
      required: true,
    },

    discount: {
      type: Number,
      required: true,
    },

    userBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

export const Coupon = mongoose.model("Coupon", couponSchema);
