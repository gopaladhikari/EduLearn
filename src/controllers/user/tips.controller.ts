import { dbHandler } from "../../utils/dbHandler";
import { Tip } from "../../models/user/tips.model";
import { ApiError, ApiSuccess } from "../../utils/apiResponse";
import { isValidObjectId } from "mongoose";

export const getTips = dbHandler(async (req, res) => {
  const userId = req.params.userId;

  if (!isValidObjectId(userId)) throw new ApiError("User id not valid");

  const tips = await Tip.find({ userId });

  if (!tips) throw new ApiError("Tips not found");

  res.status(200).json(new ApiSuccess("Tips fetched successfully", tips));
});

export const createTip = dbHandler(async (req, res) => {
  const { userId, title, content } = req.body;

  if (!isValidObjectId(userId)) throw new ApiError("User id not valid");
  if (!title) throw new ApiError("Title not valid");
  if (!content) throw new ApiError("Content not valid");

  const tip = await Tip.create({
    userId,
    title,
    content,
  });

  if (!tip) throw new ApiError("Tip not created");

  res.status(201).json(new ApiSuccess("Tip created successfully", tip));
});

export const updateTip = dbHandler(async (req, res) => {
  const { userId, tipId, title, content } = req.body;

  if (!isValidObjectId(userId)) throw new ApiError("User id not valid");
  if (!isValidObjectId(tipId)) throw new ApiError("Tip id not valid");
  if (!title) throw new ApiError("Title not valid");
  if (!content) throw new ApiError("Content not valid");

  const tip = await Tip.findOneAndUpdate(
    { userId, tipId },
    { title, content },
    { new: true }
  );

  if (!tip) throw new ApiError("Tip not found");

  res.status(200).json(new ApiSuccess("Tip updated successfully", tip));
});

export const deleteTip = dbHandler(async (req, res) => {
  const { userId, tipId } = req.body;

  if (!isValidObjectId(userId)) throw new ApiError("User id not valid");
  if (!isValidObjectId(tipId)) throw new ApiError("Tip id not valid");

  const tip = await Tip.findOneAndDelete({ userId, tipId });

  if (!tip) throw new ApiError("Tip not found");

  res.status(200).json(new ApiSuccess("Tip deleted successfully", tip));
});
