import { ApiError, ApiSuccess } from "../../utils/apiResponse";
import { dbHandler } from "../../utils/dbHandler";
import { AddNotes } from "../../models/user/addNotes.model";
import { isValidObjectId } from "mongoose";
import { addNotesSchema } from "../../schemas/addnotes.schema";

export const getAddNotes = dbHandler(async (req, res) => {
  const courseId = req.params.courseId;
  const userId = req.user?._id;

  if (!isValidObjectId(courseId)) throw new ApiError("Invalid courseId");

  const addNotes = await AddNotes.findOne({ userId, courseId });
  if (!addNotes) throw new ApiError("AddNotes not found");

  res
    .status(200)
    .json(new ApiSuccess("AddNotes fetched successfully", addNotes));
});

export const addAddNotes = dbHandler(async (req, res) => {
  const userId = req.user?._id;
  const courseId = req.params.courseId;

  if (!isValidObjectId(courseId)) throw new ApiError("Invalid courseId");

  const { data, success, error } = addNotesSchema.safeParse(req.body);

  if (!success) throw new ApiError(error.message);

  const addNotes = await AddNotes.findOneAndUpdate(
    {
      userId: userId,
      courseId: courseId,
    },
    {
      userId: userId,
      courseId: courseId,
      note: data.note,
    },
    {
      upsert: true,
      new: true,
    }
  );

  if (!addNotes) throw new ApiError("AddNotes not found");

  res
    .status(200)
    .json(new ApiSuccess("AddNotes updated successfully", addNotes));
});
