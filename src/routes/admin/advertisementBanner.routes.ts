import { Router } from "express";

import {
  createAdvertisementBanner,
  deleteAdvertisementBanner,
  getAdvertisementBannerById,
  getAllAdvertisementBanners,
  updateAdvertisementBanner,
} from "../../controllers/admin/advertisementBanner.controller";
import { upload } from "../../middlewares/multer.middleware";
import { verifyJwt } from "../../middlewares/verifyJwt.middleware";

const advertisementBannerRouter = Router();

advertisementBannerRouter
  .route("/")
  .get(verifyJwt, getAllAdvertisementBanners);

advertisementBannerRouter
  .route("/")
  .post(
    upload.single("bannerImage"),
    verifyJwt,
    createAdvertisementBanner
  );

advertisementBannerRouter
  .route("/:advertisementBannerId")
  .get(getAdvertisementBannerById);

advertisementBannerRouter
  .route("/update/:advertisementBannerId")
  .put(verifyJwt, updateAdvertisementBanner);

advertisementBannerRouter
  .route("/delete/:advertisementBannerId")
  .delete(verifyJwt, deleteAdvertisementBanner);

export { advertisementBannerRouter };
