import { University } from "../../models/admin/university.model";
import { ApiError, ApiSuccess } from "../../utils/apiResponse";
import { dbHandler } from "../../utils/dbHandler";
import { isValidObjectId } from "mongoose";

export const createUniversity = dbHandler(async (req, res) => {
  const universityName = req.body.universityName;

  if (!universityName) throw new ApiError("University name is required");

  const newUniversity = await University.create({
    universityName: universityName,
  });

  if (!newUniversity) throw new ApiError("Could not create university");

  res
    .status(201)
    .json(new ApiSuccess("University created", newUniversity));
});

export const getAllUniversities = dbHandler(async (_, res) => {
  const universities = await University.find();

  if (!universities) throw new ApiError("Could not get all universities");

  res.status(200).json(new ApiSuccess("All universities", universities));
});

export const getUniversityById = dbHandler(async (req, res) => {
  const universityId = req.params.universityId;

  if (!isValidObjectId(universityId)) throw new ApiError("Invalid id");

  const university = await University.findById(universityId);

  if (!university) throw new ApiError("Could not get university by id");

  res.status(200).json(new ApiSuccess("University by id", university));
});

export const updateUniversity = dbHandler(async (req, res) => {
  const universityName = req.body.universityName;
  const universityId = req.params.universityId;

  if (!isValidObjectId(universityId)) throw new ApiError("Invalid id");

  if (!universityName) throw new ApiError("University name is required");

  const updatedUniversity = await University.findByIdAndUpdate(
    universityId,
    {
      universityName: universityName,
    }
  );

  if (!updatedUniversity)
    throw new ApiError("Could not update university");

  res
    .status(200)
    .json(new ApiSuccess("University updated", updatedUniversity));
});

export const deleteUniversity = dbHandler(async (req, res) => {
  const universityId = req.params.universityId;

  if (!isValidObjectId(universityId)) throw new ApiError("Invalid id");

  const deletedUniversity = await University.findByIdAndDelete(
    universityId
  );

  if (!deletedUniversity)
    throw new ApiError("Could not delete university");

  res
    .status(200)
    .json(new ApiSuccess("University deleted", deletedUniversity));
});
