import { isValidObjectId } from "mongoose";
import { cache } from "../../config/node-cache";
import { Semester } from "../../models/admin/semester.model";
import { Subject } from "../../models/admin/subject.model";
import { ApiError, ApiSuccess } from "../../utils/apiResponse";
import { dbHandler } from "../../utils/dbHandler";
import { subjectSchema } from "../../schemas/subject.schema";
import fs from "fs";

export const createSubject = dbHandler(async (req, res) => {
  const { success, data, error } = subjectSchema.safeParse(req.body);

  if (!success) throw new ApiError(400, "Invalid data", error.errors);

  const semesterId = req.params.semesterId;

  const adminId = req.admin?._id;

  if (!adminId) throw new ApiError(401, "Unauthorized request");

  if (!isValidObjectId(semesterId)) throw new ApiError(400, "Invalid id");

  const semester = await Semester.findById(semesterId);

  if (!semester) throw new ApiError(400, "Semester not found");

  const logoPath = req.file?.path;

  const subject = await Subject.create({
    name: data.name,
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

  const semester = await Semester.findById(semesterId);

  if (!semester) throw new ApiError(400, "Semester not found");

  const cacheKey = `subject-list-${semesterId}`;

  if (cache.has(cacheKey)) {
    const cachedSubject = cache.get(cacheKey);

    return res
      .status(200)
      .json(new ApiSuccess("All subject", cachedSubject));
  }

  res.status(200).json(new ApiSuccess("All subject", {}));
});

export const updateSubject = dbHandler(async (req, res) => {
  const { data } = subjectSchema.safeParse(req.body);
  const adminId = req.admin?._id;
  const subjectId = req.params.subjectId;

  if (adminId) throw new ApiError(401, "Unauthorized request");

  if (!isValidObjectId(subjectId)) throw new ApiError(400, "Invalid id");

  const logoPath = req.file?.path;

  const subject = await Subject.findById(subjectId);

  if (!subject) throw new ApiError(400, "Subject not found");

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

  const semester = await Semester.findOne({
    subjects: {
      $in: [subject._id],
    },
  });

  if (!semester) throw new ApiError(400, "Semester not found");

  const cacheKey = `subject-list-${semester._id}`;

  if (cache.has(cacheKey)) cache.del(cacheKey);

  const updatedSubject = await subject.save();

  res.status(200).json(new ApiSuccess("Subject updated", updatedSubject));
});

export const deleteSubject = dbHandler(async (req, res) => {
  const subjectId = req.params.subjectId;
  const adminId = req.admin?._id;

  if (!adminId) throw new ApiError(401, "Unauthorized request");

  if (!isValidObjectId(subjectId)) throw new ApiError(400, "Invalid id");

  const subject = await Subject.findById(subjectId);

  if (!subject) throw new ApiError(400, "Subject not found");

  subject.isDeleted = true;

  const semester = await Semester.findOne({
    subjects: {
      $in: [subject._id],
    },
    isDeleted: false,
  });

  if (!semester) throw new ApiError(400, "Semester not found");

  const cacheKey = `subject-list-${semester._id}`;

  if (cache.has(cacheKey)) cache.del(cacheKey);

  res.status(200).json(new ApiSuccess("Subject deleted", subject));
});
