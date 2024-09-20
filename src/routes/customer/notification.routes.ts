import { Router } from "express";

import {
  createNotification,
  deleteNotification,
  getUserNotifications,
  markNotificationAsRead,
} from "../../controllers/customer/notification.controller";
import { verifyCustomer } from "../../middlewares/customer.middleware";

const notificationRouter = Router();

notificationRouter
  .route("/create")
  .post(verifyCustomer, createNotification);

notificationRouter.route("/get").get(verifyCustomer, getUserNotifications);

notificationRouter
  .route("/update/:notificationId")
  .put(verifyCustomer, markNotificationAsRead);

notificationRouter
  .route("/delete/:notificationId")
  .delete(verifyCustomer, deleteNotification);

export { notificationRouter };
