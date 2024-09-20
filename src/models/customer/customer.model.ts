import mongoose from "mongoose";

const customerSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },

    phoneNumber: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    isPhoneNumberVerified: {
      type: Boolean,
      default: false,
    },

    email: {
      type: String,
    },

    isEmailVerified: {
      type: Boolean,
      default: false,
    },

    password: {
      type: String,
    },

    emailVerificationToken: {
      type: String,
    },

    emailVerificationExpiryDate: {
      type: Date,
      default: Date.now() + 1000 * 60 * 60 * 24 * 7, // 7 days
    },
  },
  {
    timestamps: true,
  }
);

export const Customer = mongoose.model("Customer", customerSchema);
