import { dbHandler } from "../../utils/dbHandler";
import { Tip } from "../../models/customer/tips.model";
import { ApiError, ApiSuccess } from "../../utils/apiResponse";
import { isValidObjectId } from "mongoose";
import { tipsSchema } from "../../schemas/tips.schema";
import { cache } from "../../config/node-cache";

export const getTips = dbHandler(async (req, res) => {
  const userId = req.customer?._id;

  const cacheKey = `tips-${userId}`;

  if (cache.has(cacheKey)) {
    const cachedTips = cache.get(cacheKey);

    return res
      .status(200)
      .json(new ApiSuccess("Tips fetched successfully", cachedTips));
  }

  const tips = await Tip.find({ userId });

  if (!tips) throw new ApiError(400, "Tips not found");

  cache.set(cacheKey, tips);

  res.status(200).json(new ApiSuccess("Tips fetched successfully", tips));
});

export const createTip = dbHandler(async (req, res) => {
  const userId = req.customer?._id;

  const { success, data, error } = tipsSchema.safeParse(req.body);

  if (!success) throw new ApiError(400, error.message);

  const tip = await Tip.create({
    userId,
    title: data.title,
    content: data.content,
  });

  if (!tip) throw new ApiError(400, "Tip not created");

  const cacheKey = `tips-${userId}`;

  if (cache.has(cacheKey)) cache.del(cacheKey);

  res.status(201).json(new ApiSuccess("Tip created successfully", tip));
});

export const updateTip = dbHandler(async (req, res) => {
  const tipId = req.params.tipId;
  const userId = req.customer?._id;

  if (!isValidObjectId(tipId)) throw new ApiError(400, "Tip id not valid");

  const { data, success, error } = tipsSchema.safeParse(req.body);

  if (!success) throw new ApiError(400, error.message);

  const tip = await Tip.findByIdAndUpdate(
    tipId,
    {
      title: data.title,
      content: data.content,
    },
    { new: true }
  );

  if (!tip) throw new ApiError(400, "Tip not found");

  const cacheKey = `tips-${userId}`;

  if (cache.has(cacheKey)) cache.del(cacheKey);

  res.status(200).json(new ApiSuccess("Tip updated successfully", tip));
});

export const deleteTip = dbHandler(async (req, res) => {
  const tipdId = req.params.tipId;
  const userId = req.customer?._id;

  if (!isValidObjectId(tipdId))
    throw new ApiError(400, "Tip id not valid");

  const tip = await Tip.findByIdAndDelete(tipdId);

  if (!tip) throw new ApiError(400, "Tip not found");

  const cacheKey = `tips-${userId}`;

  if (cache.has(cacheKey)) cache.del(cacheKey);

  res.status(200).json(new ApiSuccess("Tip deleted successfully", tip));
});
