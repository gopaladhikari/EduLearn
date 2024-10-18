import { Router } from "express";

import {
  createNotification,
  deleteNotification,
  getUserNotifications,
  markNotificationAsRead,
} from "../../controllers/customer/notification.controller";
import { verifyJwt } from "../../middlewares/verifyJwt.middleware";

const notificationRouter = Router();

notificationRouter.route("/create").post(verifyJwt, createNotification);

notificationRouter.route("/get").get(verifyJwt, getUserNotifications);

notificationRouter
  .route("/update/:notificationId")
  .put(verifyJwt, markNotificationAsRead);

notificationRouter
  .route("/delete/:notificationId")
  .delete(verifyJwt, deleteNotification);

export { notificationRouter };
