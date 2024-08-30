import { Router } from "express";

import {
  createAdvertisementBanner,
  deleteAdvertisementBanner,
  getAdvertisementBannerById,
  getAllAdvertisementBanners,
  updateAdvertisementBanner,
} from "../../controllers/admin/advertisementBanner.controller";
import { upload } from "../../middlewares/multer.middleware";
import { verifyJWT } from "../../middlewares/auth.middleware";

const advertisementBannerRouter = Router();

advertisementBannerRouter
  .route("/")
  .get(verifyJWT, getAllAdvertisementBanners);

advertisementBannerRouter
  .route("/")
  .post(
    upload.single("bannerImage"),
    verifyJWT,
    createAdvertisementBanner
  );

advertisementBannerRouter
  .route("/:advertisementBannerId")
  .get(getAdvertisementBannerById);

advertisementBannerRouter
  .route("/update/:advertisementBannerId")
  .put(verifyJWT, updateAdvertisementBanner);

advertisementBannerRouter
  .route("/delete/:advertisementBannerId")
  .delete(verifyJWT, deleteAdvertisementBanner);

export { advertisementBannerRouter };
