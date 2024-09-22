import mongoose, { isValidObjectId } from "mongoose";
import { CurrentPursuing } from "../../models/admin/currentPursuing.model";
import { ApiError, ApiSuccess } from "../../utils/apiResponse";
import { dbHandler } from "../../utils/dbHandler";
import { cache } from "../../config/node-cache";
import {
  createCurrentPursuingSchema,
  updateCurrentPursuingSchema,
} from "../../schemas/currentPursing.schema";
import { Semester } from "../../models/admin/semester.model";
import { Subject } from "../../models/admin/subject.model";

export const createCurrentPursuing = dbHandler(async (req, res) => {
  const { success, data, error } = createCurrentPursuingSchema.safeParse(
    req.body
  );

  if (!success) throw new ApiError(400, "Invalid data", error.errors);

  const currentPursuingCacheKey = `current-pursuing-${data.universityId}`;

  const universityId = req.params.universityId;
  const adminId = req.admin?._id;

  if (!adminId) throw new ApiError(401, "Unauthorized request");

  if (!isValidObjectId(universityId))
    throw new ApiError(400, "Invalid University ID");

  const currentPursuing = await CurrentPursuing.create({
    name: data.name,
    universityId,
  });

  if (!currentPursuing)
    throw new ApiError(400, "Could not create current pursuing");

  if (cache.has(currentPursuingCacheKey))
    cache.del(currentPursuingCacheKey);

  res
    .status(201)
    .json(new ApiSuccess("Current pursuing created", currentPursuing));
});

export const getAllCurrentPursuing = dbHandler(async (req, res) => {
  const universityId = req.params.universityId;
  const adminId = req.admin?._id;

  if (!adminId) throw new ApiError(401, "Unauthorized request");

  if (!isValidObjectId(universityId))
    throw new ApiError(400, "Invalid id");

  const cacheKey = `current-pursuing-${universityId}`;

  if (cache.has(cacheKey)) {
    const cachedCurrentPursuing = cache.get(cacheKey);

    return res
      .status(200)
      .json(new ApiSuccess("All current pursuing", cachedCurrentPursuing));
  }

  const currentPursuing = await CurrentPursuing.find({
    universityId,
  });

  if (!currentPursuing)
    throw new ApiError(400, "Could not get all current pursuing");

  cache.set(cacheKey, currentPursuing);

  res
    .status(200)
    .json(new ApiSuccess("All current pursuing", currentPursuing));
});

export const updateCurrentPursuing = dbHandler(async (req, res) => {
  const { success, data, error } = updateCurrentPursuingSchema.safeParse(
    req.body
  );

  if (!success) throw new ApiError(400, "Invalid data", error.errors);

  const currentPursuingId = req.params.currentPursuingId;

  const adminId = req.admin?._id;

  if (!adminId) throw new ApiError(401, "Unauthorized request");

  if (!isValidObjectId(currentPursuingId))
    throw new ApiError(400, "Invalid Cuurent Pursuing ID");

  const currentPursuing = await CurrentPursuing.findById(
    currentPursuingId
  );

  if (!currentPursuing)
    throw new ApiError(400, "Current pursuing not found");

  if (data.name) currentPursuing.name = data.name;

  if (data.universityId)
    currentPursuing.universityId = new mongoose.Types.ObjectId(
      data.universityId
    );

  const updatedCurrentPursuing = await currentPursuing.save();

  if (!updatedCurrentPursuing)
    throw new ApiError(400, "Could not update current pursuing");

  const currentPursuingCacheKey = `current-pursuing-${data.universityId}`;

  if (cache.has(currentPursuingCacheKey))
    cache.del(currentPursuingCacheKey);

  res
    .status(200)
    .json(
      new ApiSuccess("Current pursuing updated", updatedCurrentPursuing)
    );
});

export const deleteCurrentPursuing = dbHandler(async (req, res) => {
  const currentPursuingId = req.params.currentPursuingId;
  const adminId = req.admin?._id;

  if (!adminId) throw new ApiError(401, "Unauthorized request");

  if (!isValidObjectId(currentPursuingId))
    throw new ApiError(400, "Invalid id");

  const currentPursuing = await CurrentPursuing.findByIdAndUpdate(
    currentPursuingId,
    {
      isDeleted: true,
    }
  );

  if (!currentPursuing)
    throw new ApiError(
      400,
      "Current Pursuing is already deleted or not found"
    );

  const semesterList = await Semester.find({
    _id: { $in: currentPursuing.semesters },
  });

  if (semesterList.length > 0) {
    for (const semester of semesterList) {
      semester.isDeleted = true;
      await semester.save();

      await Subject.updateMany(
        {
          _id: { $in: semester.subjects },
        },
        {
          $set: { isDeleted: true },
        }
      );
    }
  }

  const currentPursuingCacheKey = `current-pursuing-${currentPursuing.universityId}`;

  if (cache.has(currentPursuingCacheKey))
    cache.del(currentPursuingCacheKey);

  res.status(200).json(new ApiSuccess("Current pursuing deleted", null));
});
