import mongoose, { isValidObjectId } from "mongoose";
import { cache } from "../../config/node-cache";
import { Subject } from "../../models/admin/subject.model";
import { ApiError, ApiSuccess } from "../../utils/apiResponse";
import { dbHandler } from "../../utils/dbHandler";
import { subjectSchema, updateSchema } from "../../schemas/subject.schema";
import fs from "fs";

export const createSubject = dbHandler(async (req, res) => {
  const { success, data, error } = subjectSchema.safeParse(req.body);

  if (!success) throw new ApiError(400, "Invalid data", error.errors);

  const semesterId = req.params.semesterId;

  const adminId = req.admin?._id;

  if (!adminId) throw new ApiError(401, "Unauthorized request");

  if (!isValidObjectId(semesterId)) throw new ApiError(400, "Invalid id");

  const logoPath = req.file?.path;

  const subject = await Subject.create({
    name: data.name,
    semesterId,
    logo: logoPath ?? undefined,
  });

  if (!subject) throw new ApiError(400, "Could not create subject");

  res.status(201).json(new ApiSuccess("Subject created", subject));
});

export const getAllSubject = dbHandler(async (req, res) => {
  const semesterId = req.params.semesterId;
  const adminId = req.admin?._id;

  if (!adminId) throw new ApiError(401, "Unauthorized request");

  if (!isValidObjectId(semesterId)) throw new ApiError(400, "Invalid id");

  const cacheKey = `subject-list-${semesterId}`;

  if (cache.has(cacheKey)) {
    const cachedSubject = cache.get(cacheKey);

    return res
      .status(200)
      .json(new ApiSuccess("All subject", cachedSubject));
  }

  const subjects = await Subject.aggregate([
    {
      $match: {
        semesterId: new mongoose.Types.ObjectId(semesterId),
        isDeleted: false,
      },
    },

    {
      $unset: ["isDeleted", "semesterId"],
    },
  ]);

  if (!subjects.length) throw new ApiError(404, "Subjects not found");

  cache.set(cacheKey, subjects);

  res.status(200).json(new ApiSuccess("All subject", subjects));
});

export const updateSubject = dbHandler(async (req, res) => {
  const { data } = updateSchema.safeParse(req.body);

  const subjectId = req.params.subjectId;

  const adminId = req.admin?._id;

  if (!adminId) throw new ApiError(401, "Unauthorized request");

  if (!isValidObjectId(subjectId)) throw new ApiError(400, "Invalid id");

  const logoPath = req.file?.path;

  const subject = await Subject.findById(subjectId);

  if (!subject) throw new ApiError(404, "Subject not found");

  if (data?.name) subject.name = data.name;

  if (logoPath) {
    const oldLogoPath = subject?.logo;
    if (oldLogoPath && fs.existsSync(oldLogoPath))
      try {
        fs.unlinkSync(oldLogoPath);
      } catch (error) {
        console.error("Error deleting old logo:", error);
      }

    subject.logo = logoPath;
  }

  const updatedSubject = await subject.save();

  const cacheKey = `subject-list-${subject.semesterId}`;

  if (cache.has(cacheKey)) cache.del(cacheKey);

  res.status(200).json(new ApiSuccess("Subject updated", updatedSubject));
});

export const deleteSubject = dbHandler(async (req, res) => {
  const subjectId = req.params.subjectId;
  const adminId = req.admin?._id;

  if (!adminId) throw new ApiError(401, "Unauthorized request");

  if (!isValidObjectId(subjectId)) throw new ApiError(400, "Invalid id");

  const subject = await Subject.findOneAndUpdate(
    {
      _id: subjectId,
      isDeleted: false,
    },
    {
      isDeleted: true,
    },
    { new: true }
  ).select("-isDeleted -semesterId");

  if (!subject) throw new ApiError(404, "Subject not found");

  const cacheKey = `subject-list-${subject.semesterId}`;

  if (cache.has(cacheKey)) cache.del(cacheKey);

  res.status(200).json(new ApiSuccess("Subject deleted", subject));
});
