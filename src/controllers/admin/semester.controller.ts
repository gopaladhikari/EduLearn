import { isValidObjectId } from "mongoose";
import { cache } from "../../config/node-cache";
import { CurrentPursuing } from "../../models/admin/currentPursuing.model";
import { Semester } from "../../models/admin/semester.model";
import { Subject } from "../../models/admin/subject.model";
import { ApiError, ApiSuccess } from "../../utils/apiResponse";
import { dbHandler } from "../../utils/dbHandler";
import { semesterSchema } from "../../schemas/semester.schema";

export const createSemester = dbHandler(async (req, res) => {
  const { success, data, error } = semesterSchema.safeParse(req.body);

  if (!success) throw new ApiError(400, "Invalid data", error.errors);

  const currentPursuingId = req.params.currentPursuingId;

  const adminId = req.admin?._id;

  if (!adminId) throw new ApiError(401, "Unauthorized request");

  if (!isValidObjectId(currentPursuingId))
    throw new ApiError(400, "Invalid id");

  const currentPursuing = await CurrentPursuing.findById(
    currentPursuingId
  );

  if (!currentPursuing)
    throw new ApiError(400, "Current pursuing not found");

  const semester = await Semester.create({
    name: data.name,
  });

  if (!semester) throw new ApiError(400, "Could not create semester");

  currentPursuing.semesters.push(semester._id);
  await currentPursuing.save();

  res.status(201).json(new ApiSuccess("Semester created", semester));
});

export const getAllSemester = dbHandler(async (req, res) => {
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

  const currentPursuing = await CurrentPursuing.findById(
    currentPursuingId
  );

  if (!currentPursuing)
    throw new ApiError(400, "Current pursuing not found");

  const semesters = await Semester.find({
    _id: { $in: currentPursuing.semesters },
  });

  if (!semesters) throw new ApiError(404, "Semesters not found");

  cache.set(cacheKey, semesters);

  res.status(200).json(new ApiSuccess("All semesters", semesters));
});

export const updateSemester = dbHandler(async (req, res) => {
  const { success, data, error } = semesterSchema.safeParse(req.body);

  if (!success) throw new ApiError(400, "Invalid data", error.errors);

  const semesterId = req.params.semesterId;
  const adminId = req.admin?._id;

  if (!adminId) throw new ApiError(401, "Unauthorized request");

  if (!isValidObjectId(semesterId)) throw new ApiError(400, "Invalid id");

  const semester = await Semester.findByIdAndUpdate(
    semesterId,
    {
      name: data.name,
    },
    {
      new: true,
    }
  );

  if (!semester) throw new ApiError(400, "Could not update semester");

  const currentPursuing = await CurrentPursuing.findOne({
    semesters: {
      $in: [semester._id],
    },
    isDeleted: false,
  });

  if (!currentPursuing)
    throw new ApiError(400, "Current pursuing not found");

  const cacheKey = `semester-${currentPursuing._id}`;

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
  );

  if (!semester) throw new ApiError(400, "Semester not found");

  Subject.updateMany(
    {
      _id: { $in: semester.subjects },
    },
    {
      isDeleted: true,
    }
  );

  const currentPursuing = await CurrentPursuing.findOne({
    semesters: {
      $in: [semester._id],
    },
    isDeleted: false,
  });

  if (!currentPursuing)
    throw new ApiError(400, "Current pursuing not found");

  const cacheKey = `semester-${currentPursuing._id}`;
  if (cache.has(cacheKey)) cache.del(cacheKey);

  res.status(200).json(new ApiSuccess("Semester deleted", semester));
});
