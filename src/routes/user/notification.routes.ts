import { Router } from "express";

import {
  createNotification,
  deleteNotification,
  getUserNotifications,
  markNotificationAsRead,
} from "../../controllers/user/notification.controller";

const notificationRouter = Router();

notificationRouter.route("/").post(createNotification);

notificationRouter.get("/:userId", getUserNotifications);

notificationRouter.put("/update/:notificationId", markNotificationAsRead);

notificationRouter.delete("/delete/:notificationId", deleteNotification);

export { notificationRouter };
