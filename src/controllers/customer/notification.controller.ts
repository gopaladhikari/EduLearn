import { Notification } from "../../models/customer/notification.model";
import { ApiError, ApiSuccess } from "../../utils/apiResponse";
import { dbHandler } from "../../utils/dbHandler";
import { notificationSchema } from "../../schemas/notification.schema";
import { isValidObjectId } from "mongoose";
import { cache } from "../../config/node-cache";

export const createNotification = dbHandler(async (req, res) => {
  const userId = req.user?._id;

  const { success, data, error } = notificationSchema.safeParse(req.body);

  if (!success) throw new ApiError(400, error.message);

  const notification = await Notification.create({
    userId,
    title: data.title,
    message: data.message,
    isRead: data.isRead,
  });

  if (!notification) throw new ApiError(400, "Notification not created");

  const cacheKey = `notifications-${userId}`;

  if (cache.has(cacheKey)) cache.del(cacheKey);

  res
    .status(201)
    .json(
      new ApiSuccess("Notification created successfully", notification)
    );
});

export const getUserNotifications = dbHandler(async (req, res) => {
  const userId = req.user?._id;

  if (!userId) throw new ApiError(400, "User id not found");

  const cacheKey = `notifications-${userId}`;

  if (cache.has(cacheKey)) {
    const cachedNotifications = cache.get(cacheKey);

    return res
      .status(200)
      .json(
        new ApiSuccess(
          "Notifications fetched successfully",
          cachedNotifications
        )
      );
  }

  const notifications = await Notification.find({
    userId,
  });

  if (!notifications) throw new ApiError(400, "Notifications not found");

  cache.set(cacheKey, notifications);

  res
    .status(200)
    .json(
      new ApiSuccess("Notifications fetched successfully", notifications)
    );
});

export const markNotificationAsRead = dbHandler(async (req, res) => {
  const notificationId = req.params.notificationId;
  const userId = req.user?._id;

  if (!isValidObjectId(notificationId))
    throw new ApiError(400, "Invalid notification id");

  const notification = await Notification.findByIdAndUpdate(
    notificationId,
    { isRead: true },
    { new: true }
  );

  if (!notification) throw new ApiError(400, "Notification not found");

  const cacheKey = `notifications-${userId}`;

  if (cache.has(cacheKey)) cache.del(cacheKey);

  res
    .status(200)
    .json(
      new ApiSuccess(
        "Notification marked as read successfully",
        notification
      )
    );
});

export const deleteNotification = dbHandler(async (req, res) => {
  const notificationId = req.params.notificationId;
  const userId = req.user?._id;

  if (!isValidObjectId(notificationId))
    throw new ApiError(400, "User id not found");

  const notification = await Notification.findByIdAndDelete(
    notificationId
  );

  if (!notification) throw new ApiError(400, "Notification not found");

  const cacheKey = `notifications-${userId}`;

  if (cache.has(cacheKey)) cache.del(cacheKey);

  res
    .status(200)
    .json(
      new ApiSuccess("Notification deleted successfully", notification)
    );
});
