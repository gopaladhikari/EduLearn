import { isValidObjectId } from "mongoose";
import { AdvertisementBanner } from "../../models/admin/advertisementBanner.model";
import { ApiError, ApiSuccess } from "../../utils/apiResponse";
import { dbHandler } from "../../utils/dbHandler";

export const createAdvertisementBanner = dbHandler(async (req, res) => {
  const bannerImage = req.file?.path;

  if (!bannerImage) throw new ApiError("Banner image is required!");

  const newAdvertisementBanner = await AdvertisementBanner.create({
    bannerImage: bannerImage,
  });

  if (!newAdvertisementBanner)
    throw new ApiError("Advertisement banner not created!");

  res
    .status(201)
    .json(
      new ApiSuccess(
        "Advertisement banner created successfully!",
        newAdvertisementBanner
      )
    );
});

export const getAllAdvertisementBanners = dbHandler(async (req, res) => {
  const advertisementBanners = await AdvertisementBanner.find({
    isDeleted: false,
  });

  if (!advertisementBanners.length)
    throw new ApiError("Advertisement banners not found!");

  return res
    .status(200)
    .json(
      new ApiSuccess(
        "Advertisement banners fetched successfully!",
        advertisementBanners
      )
    );
});

export const getAdvertisementBannerById = dbHandler(async (req, res) => {
  const advertisementBannerId = req.params.advertisementBannerId;

  if (!isValidObjectId(advertisementBannerId))
    throw new ApiError("Advertisement banner id is invalid!");

  const advertisementBanner = await AdvertisementBanner.findById(
    advertisementBannerId
  );

  if (!advertisementBanner || advertisementBanner.isDeleted)
    throw new ApiError("Advertisement banner not found!");

  return res
    .status(200)
    .json(
      new ApiSuccess(
        "Advertisement banner fetched successfully!",
        advertisementBanner
      )
    );
});

export const updateAdvertisementBanner = dbHandler(async (req, res) => {
  const advertisementBannerId = req.params.advertisementBannerId;

  if (!isValidObjectId(advertisementBannerId))
    throw new ApiError("Advertisement banner id is invalid!");

  const bannerImage = req.file?.path;

  if (!bannerImage) throw new ApiError("Banner image is required!");

  const advertisementBanner = await AdvertisementBanner.findOneAndUpdate(
    {
      _id: advertisementBannerId,
      isDeleted: false,
    },
    { bannerImage },
    {
      new: true,
    }
  );

  if (!advertisementBanner)
    throw new ApiError("Advertisement banner not found!");

  return res
    .status(200)
    .json(
      new ApiSuccess(
        "Advertisement banner updated successfully!",
        advertisementBanner
      )
    );
});

export const deleteAdvertisementBanner = dbHandler(async (req, res) => {
  const advertisementBannerId = req.params.advertisementBannerId;

  if (!isValidObjectId(advertisementBannerId))
    throw new ApiError("Advertisement banner id is invalid!");

  const advertisementBanner = await AdvertisementBanner.findByIdAndUpdate(
    {
      _id: advertisementBannerId,
      isDeleted: false,
    },
    {
      isDeleted: true,
    }
  );

  if (!advertisementBanner)
    throw new ApiError("Advertisement banner not found!");

  return res
    .status(200)
    .json(
      new ApiSuccess(
        "Advertisement banner deleted successfully!",
        advertisementBanner
      )
    );
});
