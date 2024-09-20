import { Router } from "express";

import {
  createAdvertisementBanner,
  deleteAdvertisementBanner,
  getAdvertisementBannerById,
  getAllAdvertisementBanners,
  updateAdvertisementBanner,
} from "../../controllers/admin/advertisementBanner.controller";
import { upload } from "../../middlewares/multer.middleware";
import { verifyCustomer } from "../../middlewares/customer.middleware";

const advertisementBannerRouter = Router();

advertisementBannerRouter
  .route("/")
  .get(verifyCustomer, getAllAdvertisementBanners);

advertisementBannerRouter
  .route("/")
  .post(
    upload.single("bannerImage"),
    verifyCustomer,
    createAdvertisementBanner
  );

advertisementBannerRouter
  .route("/:advertisementBannerId")
  .get(getAdvertisementBannerById);

advertisementBannerRouter
  .route("/update/:advertisementBannerId")
  .put(verifyCustomer, updateAdvertisementBanner);

advertisementBannerRouter
  .route("/delete/:advertisementBannerId")
  .delete(verifyCustomer, deleteAdvertisementBanner);

export { advertisementBannerRouter };
