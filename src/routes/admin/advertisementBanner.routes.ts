import { Router } from "express";

import {
  createAdvertisementBanner,
  deleteAdvertisementBanner,
  getAdvertisementBannerById,
  getAllAdvertisementBanners,
  updateAdvertisementBanner,
} from "../../controllers/admin/advertisementBanner.controller";
import { upload } from "../../middlewares/multer.middleware";

const advertisementBannerRouter = Router();

advertisementBannerRouter.route("/").get(getAllAdvertisementBanners);

advertisementBannerRouter
  .route("/")
  .post(upload.single("bannerImage"), createAdvertisementBanner);

advertisementBannerRouter
  .route("/:advertisementBannerId")
  .get(getAdvertisementBannerById);

advertisementBannerRouter
  .route("/update/:advertisementBannerId")
  .put(updateAdvertisementBanner);

advertisementBannerRouter
  .route("/delete/:advertisementBannerId")
  .delete(deleteAdvertisementBanner);

export { advertisementBannerRouter };
