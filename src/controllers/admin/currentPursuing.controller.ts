import { isValidObjectId } from "mongoose";
import { CurrentPursuing } from "../../models/admin/currentPursuing.model";
import { currentPursuingSchema } from "../../schemas/currentPursing.schema";
import { ApiError, ApiSuccess } from "../../utils/apiResponse";
import { dbHandler } from "../../utils/dbHandler";
import { cache } from "../../config/node-cache";

export const createCurrentPursuing = dbHandler(async (req, res) => {
  const userId = req.user?._id;

  const { success, data, error } = currentPursuingSchema.safeParse(
    req.body
  );

  if (!success) throw new ApiError(400, error.message);

  const currentPursing = await CurrentPursuing.create({
    universityId: data.universityId,
    currentPursuingCourse: data.currentPursuingCourse,
    semesters: data.semesters,
  });

  if (!currentPursing)
    throw new ApiError(400, "Could not create current pursuing");

  const cacheKey = `currentPursuing-${userId}`;

  if (cache.has(cacheKey)) cache.del(cacheKey);

  res
    .status(201)
    .json(new ApiSuccess("Current pursuing created", currentPursing));
});

export const getAllCurrentPursuings = dbHandler(async (req, res) => {
  const userId = req.user?._id;

  const cacheKey = `currentPursuing-${userId}`;

  if (cache.has(cacheKey)) {
    const cachedCurrentPursuings = cache.get(cacheKey);

    return res
      .status(200)
      .json(
        new ApiSuccess(
          "Current pursuings fetched successfully",
          cachedCurrentPursuings
        )
      );
  }

  const currentPursuings = await CurrentPursuing.find().populate(
    "universityId"
  );

  if (!currentPursuings)
    throw new ApiError(400, "Could not get all current pursuings");

  cache.set(cacheKey, currentPursuings);

  res
    .status(200)
    .json(new ApiSuccess("All current pursuings", currentPursuings));
});

export const getCurrentPursuingById = dbHandler(async (req, res) => {
  const currentPursuingId = req.params.currentPursuingId;

  const userId = req.user?._id;

  if (!isValidObjectId(currentPursuingId))
    throw new ApiError(400, "Invalid id");

  const cacheKey = `currentPursuing-${userId}-${currentPursuingId}`;

  if (cache.has(cacheKey)) {
    const cachedCurrentPursuing = cache.get(cacheKey);

    return res
      .status(200)
      .json(
        new ApiSuccess("Current pursuing by id", cachedCurrentPursuing)
      );
  }

  const currentPursuing = await CurrentPursuing.findById(
    currentPursuingId
  ).populate("universityId");

  if (!currentPursuing)
    throw new ApiError(400, "Could not get current pursuing by id");

  cache.set(cacheKey, currentPursuing);

  res
    .status(200)
    .json(new ApiSuccess("Current pursuing by id", currentPursuing));
});

export const updateCurrentPursuing = dbHandler(async (req, res) => {
  const currentPursuingId = req.params.currentPursuingId;
  const userId = req.user?._id;

  if (!isValidObjectId(currentPursuingId))
    throw new ApiError(400, "Invalid id");

  const { success, data, error } = currentPursuingSchema.safeParse(
    req.body
  );

  if (!success) throw new ApiError(400, error.message);

  const updatedCurrentPursuing = await CurrentPursuing.findByIdAndUpdate(
    currentPursuingId,
    {
      currentPursuingCourse: data.currentPursuingCourse,
      semesters: data.universityId,
      universityId: data.universityId,
    },
    { new: true }
  );

  if (!updatedCurrentPursuing)
    throw new ApiError(400, "Could not update current pursuing");

  const cacheKey = `currentPursuing-${userId}-${currentPursuingId}`;
  const cacheKey2 = `currentPursuing-${userId}`;

  if (cache.has(cacheKey)) cache.del(cacheKey);
  if (cache.has(cacheKey2)) cache.del(cacheKey2);

  res
    .status(200)
    .json(
      new ApiSuccess("Current pursuing updated", updatedCurrentPursuing)
    );
});

export const deleteCurrentPursuing = dbHandler(async (req, res) => {
  const currentPursuingId = req.params.currentPursuingId;
  const userId = req.user?._id;

  if (!isValidObjectId(currentPursuingId))
    throw new ApiError(400, "Invalid id");

  const deletedCurrentPursuing = await CurrentPursuing.findByIdAndDelete(
    currentPursuingId
  );

  if (!deletedCurrentPursuing)
    throw new ApiError(400, "Could not delete current pursuing");

  const cacheKey = `currentPursuing-${userId}-${currentPursuingId}`;
  const cacheKey2 = `currentPursuing-${userId}`;

  if (cache.has(cacheKey)) cache.del(cacheKey);
  if (cache.has(cacheKey2)) cache.del(cacheKey2);

  res
    .status(200)
    .json(
      new ApiSuccess("Current pursuing deleted", deletedCurrentPursuing)
    );
});
