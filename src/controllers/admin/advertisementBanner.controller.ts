import { isValidObjectId } from "mongoose";
import { AdvertisementBanner } from "../../models/admin/advertisementBanner.model";
import { ApiError, ApiSuccess } from "../../utils/apiResponse";
import { dbHandler } from "../../utils/dbHandler";
import { cache } from "../../config/node-cache";

export const createAdvertisementBanner = dbHandler(async (req, res) => {
  const bannerImage = req.file?.path;
  const userId = req.user?._id;

  if (!bannerImage) throw new ApiError(400, "Banner image is required!");

  const newAdvertisementBanner = await AdvertisementBanner.create({
    bannerImage,
  });

  if (!newAdvertisementBanner)
    throw new ApiError(400, "Advertisement banner not created!");

  const cacheKey = `advertisementBanner-${userId}`;

  if (cache.has(cacheKey)) cache.del(cacheKey);

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
  const userId = req.user?._id;

  const cacheKey = `advertisementBanner-${userId}`;

  if (cache.has(cacheKey)) {
    const cachedAdvertisementBanners = cache.get(cacheKey);

    return res
      .status(200)
      .json(
        new ApiSuccess(
          "Advertisement banners fetched successfully!",
          cachedAdvertisementBanners
        )
      );
  }

  const advertisementBanners = await AdvertisementBanner.find({
    isDeleted: false,
  });

  if (!advertisementBanners.length)
    throw new ApiError(400, "Advertisement banners not found!");

  cache.set(cacheKey, advertisementBanners);

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
  const userId = req.user?._id;

  if (!isValidObjectId(advertisementBannerId))
    throw new ApiError(400, "Advertisement banner id is invalid!");

  const advertisementBanner = await AdvertisementBanner.findById(
    advertisementBannerId
  );

  if (!advertisementBanner || advertisementBanner.isDeleted)
    throw new ApiError(400, "Advertisement banner not found!");

  const cacheKey = `advertisementBanner-${userId}-${advertisementBannerId}`;

  if (cache.has(cacheKey)) cache.del(cacheKey);

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
  const userId = req.user?._id;

  if (!isValidObjectId(advertisementBannerId))
    throw new ApiError(400, "Advertisement banner id is invalid!");

  const bannerImage = req.file?.path;

  if (!bannerImage) throw new ApiError(400, "Banner image is required!");

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
    throw new ApiError(400, "Advertisement banner not found!");

  const cacheKey = `advertisementBanner-${userId}-${advertisementBannerId}`;
  const cacheKey2 = `advertisementBanner-${userId}`;

  if (cache.has(cacheKey)) cache.del(cacheKey);
  if (cache.has(cacheKey2)) cache.del(cacheKey);

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
  const userId = req.user?._id;

  if (!isValidObjectId(advertisementBannerId))
    throw new ApiError(400, "Advertisement banner id is invalid!");

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
    throw new ApiError(400, "Advertisement banner not found!");

  const cacheKey = `advertisementBanner-${userId}-${advertisementBannerId}`;
  const cacheKey2 = `advertisementBanner-${userId}`;

  if (cache.has(cacheKey)) cache.del(cacheKey);
  if (cache.has(cacheKey2)) cache.del(cacheKey);

  return res
    .status(200)
    .json(
      new ApiSuccess(
        "Advertisement banner deleted successfully!",
        advertisementBanner
      )
    );
});
