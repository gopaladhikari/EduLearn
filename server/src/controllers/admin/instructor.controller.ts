import { isValidObjectId } from "mongoose";
import { ApiError, ApiSuccess } from "../../utils/apiResponse";
import { dbHandler } from "../../utils/dbHandler";
import { cache } from "../../config/node-cache";
import {
  createInstructorSchema,
  updateInstructorSchema,
} from "../../schemas/instructor.schema";
import { Instructor } from "../../models/admin/instructor.model";

export const createInstructor = dbHandler(async (req, res) => {
  const adminId = req.admin?._id;

  if (!adminId) throw new ApiError(401, "Unauthorized request");

  const { data, success, error } = createInstructorSchema.safeParse(
    req.body
  );

  if (!success) throw new ApiError(400, "Invalid data", error.errors);

  const profilePicturePath = req.file?.path;

  const instructor = await Instructor.create({
    name: data.name,
    bio: data.bio,
    profilePicture: profilePicturePath,
    socialLinks: data.socialLinks,
    hiredOn: data.hiredOn ?? Date.now(),
  });

  if (!instructor) throw new ApiError(400, "Instructor not created");

  const cacheKey = `instructor-list`;

  if (cache.has(cacheKey)) cache.del(cacheKey);

  res
    .status(201)
    .json(new ApiSuccess("Instructor created successfully", instructor));
});

export const getAllInstructor = dbHandler(async (req, res) => {
  const adminId = req.admin?._id;

  if (!adminId) throw new ApiError(401, "Unauthorized request");

  const cacheKey = `instructor-list`;

  if (cache.has(cacheKey)) {
    const cachedInstructor = cache.get(cacheKey);

    return res
      .status(200)
      .json(new ApiSuccess("All instructor", cachedInstructor));
  }

  const instructors = await Instructor.aggregate([
    {
      $match: {
        firedOn: { $exists: false },
      },
    },
  ]);

  if (!instructors.length)
    throw new ApiError(404, "Instructors not found");

  cache.set(cacheKey, instructors[0]);

  res.status(200).json(new ApiSuccess("All instructor", instructors[0]));
});

export const updateInstructor = dbHandler((req, res) => {
  const adminId = req.admin?._id;

  if (!adminId) throw new ApiError(401, "Unauthorized request");

  const instructorId = req.params?.instructorId;

  if (!isValidObjectId(instructorId))
    throw new ApiError(400, "Invalid instructor id");

  const { data, success, error } = updateInstructorSchema.safeParse(
    req.body
  );

  if (!success) throw new ApiError(400, "Invalid data", error.errors);
});

export const deleteInstructor = dbHandler((req, res) => {
  const instructorId = req.params?.instructorId;
});
