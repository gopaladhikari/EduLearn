import mongoose, { isValidObjectId } from "mongoose";
import { cache } from "../../config/node-cache";
import { Semester } from "../../models/admin/semester.model";
import { ApiError, ApiSuccess } from "../../utils/apiResponse";
import { dbHandler } from "../../utils/dbHandler";
import {
  semesterSchema,
  updateSemesterSchema,
} from "../../schemas/semester.schema";

export const createSemesterByCurrentPursuingId = dbHandler(
  async (req, res) => {
    const { success, data, error } = semesterSchema.safeParse(req.body);

    if (!success) throw new ApiError(400, "Invalid data", error.errors);

    const currentPursuingId = req.params.currentPursuingId;

    const adminId = req.admin?._id;

    if (!adminId) throw new ApiError(401, "Unauthorized request");

    if (!isValidObjectId(currentPursuingId))
      throw new ApiError(400, "Invalid Current Pursuing Id");

    const dbData = data.names.map((name) => ({ name, currentPursuingId }));

    const semester = await Semester.insertMany(dbData);

    if (!semester) throw new ApiError(400, "Could not create semester");

    res.status(201).json(new ApiSuccess("Semester created", semester));
  }
);

export const getAllSemesterByCurrentPursuingId = dbHandler(
  async (req, res) => {
    const currentPursuingId = req.params.currentPursuingId;
    const adminId = req.admin?._id;

    if (!adminId) throw new ApiError(401, "Unauthorized request");

    if (!isValidObjectId(currentPursuingId))
      throw new ApiError(400, "Invalid id");

    const cacheKey = `semester-list-${currentPursuingId}`;

    if (cache.has(cacheKey)) {
      const cachedSemester = cache.get(cacheKey);

      return res
        .status(200)
        .json(new ApiSuccess("All semesters", cachedSemester));
    }

    const semesters = await Semester.aggregate([
      {
        $match: {
          currentPursuingId: new mongoose.Types.ObjectId(
            currentPursuingId
          ),
          isDeleted: false,
        },
      },
      {
        $unset: ["currentPursuingId", "isDeleted"],
      },
    ]);

    if (!semesters.length) throw new ApiError(404, "Semester not found");

    cache.set(cacheKey, semesters);

    res.status(200).json(new ApiSuccess("All semesters", semesters));
  }
);

export const updateSemester = dbHandler(async (req, res) => {
  const { success, data, error } = updateSemesterSchema.safeParse(
    req.body
  );

  if (!success) throw new ApiError(400, "Invalid data", error.errors);

  const semesterId = req.params.semesterId;
  const adminId = req.admin?._id;

  if (!adminId) throw new ApiError(401, "Unauthorized request");

  if (!isValidObjectId(semesterId)) throw new ApiError(400, "Invalid id");

  const semester = await Semester.findOneAndUpdate(
    {
      _id: semesterId,
      isDeleted: false,
    },
    {
      name: data.name,
    },
    {
      new: true,
    }
  );

  if (!semester) throw new ApiError(404, "Semester not found");

  const cacheKey = `semester-list-${semester.currentPursuingId}`;

  if (cache.has(cacheKey)) cache.del(cacheKey);

  res.status(200).json(new ApiSuccess("Semester updated", semester));
});

export const deleteSemester = dbHandler(async (req, res) => {
  const semesterId = req.params.semesterId;
  const adminId = req.admin?._id;

  if (!adminId) throw new ApiError(401, "Unauthorized request");

  if (!isValidObjectId(semesterId)) throw new ApiError(400, "Invalid id");

  const semester = await Semester.findOneAndUpdate(
    {
      _id: semesterId,
      isDeleted: false,
    },
    {
      isDeleted: true,
    },
    {
      new: true,
    }
  ).select("-isDeleted -currentPursuingId");

  if (!semester) throw new ApiError(404, "Semester not found");

  const cacheKey = `semester-list-${semester.currentPursuingId}`;

  if (cache.has(cacheKey)) cache.del(cacheKey);

  res.status(200).json(new ApiSuccess("Semester deleted", semester));
});
