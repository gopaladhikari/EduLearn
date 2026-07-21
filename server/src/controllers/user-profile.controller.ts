import { UserProfile } from "@/models/user-profile.model.js";
import { ApiError, ApiResponse } from "@/utils/api-responses.js";
import { cloudinary } from "@/utils/cloudinary.js";
import type { Request, Response } from "express";

export const updateProfile = async (req: Request, res: Response) => {
  const user = req.user!;

  const allowedFields = [
    "firstName",
    "lastName",
    "bio",
    "phone",
    "dateOfBirth",
    "gender",
    "address",
  ];

  const updateData = Object.fromEntries(
    Object.entries(req.body).filter(([key]) => allowedFields.includes(key))
  );

  const profile = await UserProfile.findOneAndUpdate(
    { user: user._id },
    { $set: updateData },
    { new: true }
  );

  if (!profile) throw new ApiError(400, "Profile not found.");

  return res.status(200).json(
    new ApiResponse(200, "Profile updated successfully.", {
      user,
    })
  );
};

export const updateAvatar = async (req: Request, res: Response) => {
  const avatarFilePath = req.file?.path;

  const user = req.user!;

  if (!avatarFilePath) throw new ApiError(400, "Avatar not found. Try again.");

  const result = await cloudinary.upload(avatarFilePath);

  if (!result) throw new ApiError(400, "Avatar upload failed.");

  const previoudAvatarId = user.profile.avatar.public_id;

  const updatedUser = await UserProfile.findOneAndUpdate(
    { user: user._id },
    {
      $set: {
        avatar: {
          secure_url: result.secure_url,
          public_id: result.public_id,
        },
      },
    }
  );

  if (!updatedUser) throw new ApiError(400, "User not found.");

  res.status(200).json(
    new ApiResponse(200, "Avatar updated successfully", {
      user,
    })
  );

  void cloudinary.delete(previoudAvatarId);
};
