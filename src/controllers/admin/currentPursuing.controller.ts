import { isValidObjectId } from "mongoose";
import { CurrentPursuing } from "../../models/admin/currentPursuing.model";
import { currentPursuingSchema } from "../../schemas/currentPursing.schema";
import { ApiError, ApiSuccess } from "../../utils/apiResponse";
import { dbHandler } from "../../utils/dbHandler";

export const createCurrentPursuing = dbHandler(async (req, res) => {
  const { success, data, error } = currentPursuingSchema.safeParse(
    req.body
  );

  if (!success) throw new ApiError(error.message);

  const currentPursing = await CurrentPursuing.create({
    universityId: data.universityId,
    currentPursuingCourse: data.currentPursuingCourse,
    semesters: data.semesters,
  });

  if (!currentPursing)
    throw new ApiError("Could not create current pursuing");

  res
    .status(201)
    .json(new ApiSuccess("Current pursuing created", currentPursing));
});

export const getAllCurrentPursuings = dbHandler(async (_, res) => {
  const currentPursuings = await CurrentPursuing.find().populate(
    "universityId"
  );

  if (!currentPursuings)
    throw new ApiError("Could not get all current pursuings");

  res
    .status(200)
    .json(new ApiSuccess("All current pursuings", currentPursuings));
});

export const getCurrentPursuingById = dbHandler(async (req, res) => {
  const currentPursuingId = req.params.currentPursuingId;

  if (!isValidObjectId(currentPursuingId))
    throw new ApiError("Invalid id");

  const currentPursuing = await CurrentPursuing.findById(
    currentPursuingId
  ).populate("universityId");

  if (!currentPursuing)
    throw new ApiError("Could not get current pursuing by id");

  res
    .status(200)
    .json(new ApiSuccess("Current pursuing by id", currentPursuing));
});

export const updateCurrentPursuing = dbHandler(async (req, res) => {
  const currentPursuingId = req.params.currentPursuingId;

  if (!isValidObjectId(currentPursuingId))
    throw new ApiError("Invalid id");

  const { success, data, error } = currentPursuingSchema.safeParse(
    req.body
  );

  if (!success) throw new ApiError(error.message);

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
    throw new ApiError("Could not update current pursuing");

  res
    .status(200)
    .json(
      new ApiSuccess("Current pursuing updated", updatedCurrentPursuing)
    );
});

export const deleteCurrentPursuing = dbHandler(async (req, res) => {
  const currentPursuingId = req.params.currentPursuingId;

  if (!isValidObjectId(currentPursuingId))
    throw new ApiError("Invalid id");

  const deletedCurrentPursuing = await CurrentPursuing.findByIdAndDelete(
    currentPursuingId
  );

  if (!deletedCurrentPursuing)
    throw new ApiError("Could not delete current pursuing");

  res
    .status(200)
    .json(
      new ApiSuccess("Current pursuing deleted", deletedCurrentPursuing)
    );
});
