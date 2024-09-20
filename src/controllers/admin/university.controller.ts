import { cache } from "../../config/node-cache";
import { University } from "../../models/admin/university.model";
import { createUniversitySchema } from "../../schemas/universitySchema";
import { ApiError, ApiSuccess } from "../../utils/apiResponse";
import { dbHandler } from "../../utils/dbHandler";
import { isValidObjectId } from "mongoose";

export const createUniversity = dbHandler(async (req, res) => {
  const { success, data, error } = createUniversitySchema.safeParse(
    req.body
  );

  const logoPath = req.file?.path;

  if (!logoPath) throw new ApiError(400, "University logo is required");

  if (!success) throw new ApiError(400, "Invalid data", error.errors);

  const adminId = req.admin?._id;

  const university = await University.create({
    universityName: data.universityName,
    universityLogo: logoPath,
    adminId,
  });

  const cacheKey = `university-${adminId}`;

  if (cache.has(cacheKey)) cache.del(cacheKey);

  res.status(201).json(new ApiSuccess("University created", university));
});

export const getAllUniversities = dbHandler(async (req, res) => {
  const userId = req.admin?._id;
  const universities = await University.find();

  const cacheKey = `university-${userId}`;

  if (cache.has(cacheKey)) {
    const cachedUniversities = cache.get(cacheKey);

    return res
      .status(200)
      .json(new ApiSuccess("All universities", cachedUniversities));
  }

  if (!universities)
    throw new ApiError(400, "Could not get all universities");

  cache.set(cacheKey, universities);

  res.status(200).json(new ApiSuccess("All universities", universities));
});

export const getUniversityById = dbHandler(async (req, res) => {
  const universityId = req.params.universityId;
  const userId = req.admin?._id;

  if (!isValidObjectId(universityId))
    throw new ApiError(400, "Invalid id");

  const cacheKey = `university-${userId}-${universityId}`;

  if (cache.has(cacheKey)) {
    const cachedUniversity = cache.get(cacheKey);

    return res
      .status(200)
      .json(new ApiSuccess("University by id", cachedUniversity));
  }

  const university = await University.findById(universityId);

  if (!university)
    throw new ApiError(400, "Could not get university by id");

  cache.set(cacheKey, university);

  res.status(200).json(new ApiSuccess("University by id", university));
});

export const updateUniversity = dbHandler(async (req, res) => {
  const universityName = req.body.universityName;
  const universityId = req.params.universityId;
  const userId = req.admin?._id;

  if (!isValidObjectId(universityId))
    throw new ApiError(400, "Invalid id");

  if (!universityName)
    throw new ApiError(400, "University name is required");

  const updatedUniversity = await University.findByIdAndUpdate(
    universityId,
    {
      universityName: universityName,
    }
  );

  if (!updatedUniversity)
    throw new ApiError(400, "Could not update university");

  const cacheKey = `university-${userId}-${universityId}`;
  const cacheKey2 = `university-${userId}`;

  if (cache.has(cacheKey)) cache.del(cacheKey);
  if (cache.has(cacheKey2)) cache.del(cacheKey2);

  res
    .status(200)
    .json(new ApiSuccess("University updated", updatedUniversity));
});

export const deleteUniversity = dbHandler(async (req, res) => {
  const universityId = req.params.universityId;
  const userId = req.admin?._id;

  if (!isValidObjectId(universityId))
    throw new ApiError(400, "Invalid id");

  const deletedUniversity = await University.findByIdAndDelete(
    universityId
  );

  if (!deletedUniversity)
    throw new ApiError(400, "Could not delete university");

  const cacheKey = `university-${userId}-${universityId}`;
  const cacheKey2 = `university-${userId}`;

  if (cache.has(cacheKey)) cache.del(cacheKey);
  if (cache.has(cacheKey2)) cache.del(cacheKey2);

  res
    .status(200)
    .json(new ApiSuccess("University deleted", deletedUniversity));
});
