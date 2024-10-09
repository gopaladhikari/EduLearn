import mongoose, { isValidObjectId } from "mongoose";
import { CurrentPursuing } from "../../models/admin/currentPursuing.model";
import { ApiError, ApiSuccess } from "../../utils/apiResponse";
import { dbHandler } from "../../utils/dbHandler";
import { cache } from "../../config/node-cache";
import { createCurrentPursuingSchema } from "../../schemas/currentPursing.schema";
import { Semester } from "../../models/admin/semester.model";
import { Subject } from "../../models/admin/subject.model";

export const createCurrentPursuingByUniversityId = dbHandler(
  async (req, res) => {
    const universityId = req.params.universityId;

    if (!isValidObjectId(universityId))
      throw new ApiError(400, "Invalid University ID");

    const { success, data, error } = createCurrentPursuingSchema.safeParse(
      req.body
    );

    if (!success) throw new ApiError(400, "Invalid data", error.errors);

    const currentPursuingCacheKey = `current-pursuing-${universityId}`;

    const adminId = req.admin?._id;

    if (!adminId) throw new ApiError(401, "Unauthorized request");

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
  }
);

export const getAllCurrentPursuingByUniversityId = dbHandler(
  async (req, res) => {
    const universityId = req.params.universityId;
    const adminId = req.admin?._id;

    if (!adminId) throw new ApiError(401, "Unauthorized request");

    if (!isValidObjectId(universityId))
      throw new ApiError(400, "Invalid University Id");

    const cacheKey = `current-pursuing-${universityId}`;

    if (cache.has(cacheKey)) {
      const cachedCurrentPursuing = cache.get(cacheKey);

      return res
        .status(200)
        .json(
          new ApiSuccess("All current pursuing", cachedCurrentPursuing)
        );
    }

    const currentPursuing = await CurrentPursuing.aggregate([
      {
        $match: {
          universityId: new mongoose.Types.ObjectId(universityId),
          isDeleted: false,
        },
      },

      {
        $unset: "semesters",
      },

      {
        $unset: "universityId",
      },
    ]);

    if (!currentPursuing.length)
      throw new ApiError(404, "Current pursuing not found");

    cache.set(cacheKey, currentPursuing);

    res
      .status(200)
      .json(new ApiSuccess("All current pursuing", currentPursuing));
  }
);

export const updateCurrentPursuing = dbHandler(async (req, res) => {
  const currentPursuingId = req.params.currentPursuingId;

  if (!isValidObjectId(currentPursuingId))
    throw new ApiError(400, "Invalid Cuurent Pursuing ID");

  const { success, data, error } = createCurrentPursuingSchema.safeParse(
    req.body
  );

  if (!success) throw new ApiError(400, "Invalid data", error.errors);

  const adminId = req.admin?._id;

  if (!adminId) throw new ApiError(401, "Unauthorized request");

  const currentPursuing = await CurrentPursuing.findByIdAndUpdate(
    currentPursuingId,
    {
      name: data.name,
    },
    {
      new: true,
    }
  );

  if (!currentPursuing)
    throw new ApiError(400, "Could not update current pursuing");

  const currentPursuingCacheKey = `current-pursuing-${currentPursuing.universityId}`;

  if (cache.has(currentPursuingCacheKey))
    cache.del(currentPursuingCacheKey);

  res
    .status(200)
    .json(new ApiSuccess("Current pursuing updated", currentPursuing));
});

export const deleteCurrentPursuing = dbHandler(async (req, res) => {
  const currentPursuingId = req.params.currentPursuingId;
  const adminId = req.admin?._id;

  if (!adminId) throw new ApiError(401, "Unauthorized request");

  if (!isValidObjectId(currentPursuingId))
    throw new ApiError(400, "Invalid id");

  const currentPursuing = await CurrentPursuing.findOneAndDelete(
    {
      _id: currentPursuingId,
      isDeleted: false,
    },
    {
      isDeleted: true,
    }
  );

  if (!currentPursuing)
    throw new ApiError(404, "Current pursuing not found");

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
