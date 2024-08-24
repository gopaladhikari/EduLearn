import mongoose from "mongoose";

const advertisementBannerSchema = new mongoose.Schema(
  {
    bannerImage: {
      type: String,
      required: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const AdvertisementBannerModel = mongoose.model(
  "AdvertisementBanner",
  advertisementBannerSchema
);
