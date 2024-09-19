import { Router } from "express";

import {
  createNotification,
  deleteNotification,
  getUserNotifications,
  markNotificationAsRead,
} from "../../controllers/customer/notification.controller";
import { verifyJWT } from "../../middlewares/auth.middleware";

const notificationRouter = Router();

notificationRouter.route("/create").post(verifyJWT, createNotification);

notificationRouter.route("/get").get(verifyJWT, getUserNotifications);

notificationRouter
  .route("/update/:notificationId")
  .put(verifyJWT, markNotificationAsRead);

notificationRouter
  .route("/delete/:notificationId")
  .delete(verifyJWT, deleteNotification);

export { notificationRouter };
