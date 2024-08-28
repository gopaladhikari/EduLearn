import { dbHandler } from "../../utils/dbHandler";
import { Tip } from "../../models/user/tips.model";
import { ApiError, ApiSuccess } from "../../utils/apiResponse";
import { isValidObjectId } from "mongoose";
import { tipsSchema } from "../../schemas/tips.schema";

export const getTips = dbHandler(async (req, res) => {
  const userId = req.user?._id;

  const tips = await Tip.find({ userId });

  if (!tips) throw new ApiError("Tips not found");

  res.status(200).json(new ApiSuccess("Tips fetched successfully", tips));
});

export const createTip = dbHandler(async (req, res) => {
  const userId = req.user?._id;

  const { success, data, error } = tipsSchema.safeParse(req.body);

  if (!success) throw new ApiError(error.message);

  const tip = await Tip.create({
    userId,
    title: data.title,
    content: data.content,
  });

  if (!tip) throw new ApiError("Tip not created");

  res.status(201).json(new ApiSuccess("Tip created successfully", tip));
});

export const updateTip = dbHandler(async (req, res) => {
  const tipId = req.params.tipId;

  if (!isValidObjectId(tipId)) throw new ApiError("Tip id not valid");

  const { data, success, error } = tipsSchema.safeParse(req.body);

  if (!success) throw new ApiError(error.message);

  const tip = await Tip.findByIdAndUpdate(
    tipId,
    {
      title: data.title,
      content: data.content,
    },
    { new: true }
  );

  if (!tip) throw new ApiError("Tip not found");

  res.status(200).json(new ApiSuccess("Tip updated successfully", tip));
});

export const deleteTip = dbHandler(async (req, res) => {
  const tipdId = req.params.tipId;

  if (!isValidObjectId(tipdId)) throw new ApiError("Tip id not valid");

  const tip = await Tip.findByIdAndDelete(tipdId);

  if (!tip) throw new ApiError("Tip not found");

  res.status(200).json(new ApiSuccess("Tip deleted successfully", tip));
});
