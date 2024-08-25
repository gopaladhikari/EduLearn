import { UserDetails } from "../../models/user/userDetails.model";
import { userDetailsSchema } from "../../schemas/userSchema";
import { ApiError, ApiSuccess } from "../../utils/apiResponse";
import { dbHandler } from "../../utils/dbHandler";
import { isValidObjectId } from "mongoose";

export const createUserDetails = dbHandler(async (req, res) => {
  const { success, data, error } = userDetailsSchema.safeParse(
    req.body
  );

  if (!success) throw new ApiError(error.message);

  if (!isValidObjectId(data.userId))
    throw new ApiError("Invalid user id");

  const userDetails = await UserDetails.create({
    userId: data.userId,
    universityName: data.universityName,
    currentlyPursuing: data.currentlyPursuing,
    semester: data.semester,
    subject: data.subject,
  });

  if (!userDetails) throw new ApiError("User details not created");

  res
    .status(201)
    .json(
      new ApiSuccess("User details created successfully", userDetails)
    );
});

export const getUserDetailsById = dbHandler(async (req, res) => {
  const userId = req.params.userId;

  if (!isValidObjectId(userId)) throw new ApiError("Invalid user id");

  const userDetails = await UserDetails.findById(userId);

  if (!userDetails) throw new ApiError("User details not found");

  res
    .status(200)
    .json(
      new ApiSuccess("User details fetched successfully", userDetails)
    );
});

export const updateUserDetails = dbHandler(async (req, res) => {
  const userId = req.params.userId;

  if (!isValidObjectId(userId)) throw new ApiError("Invalid user id");

  const { success, data, error } = userDetailsSchema.safeParse(
    req.body
  );

  if (!success) throw new ApiError(error.message);

  const updatedUserDetails = await UserDetails.findByIdAndUpdate(
    userId,
    {
      userId: data.userId,
      universityName: data.universityName,
      currentlyPursuing: data.currentlyPursuing,
      semester: data.semester,
      subject: data.subject,
    },
    { new: true }
  );

  if (!updatedUserDetails)
    throw new ApiError("User details not found");

  res
    .status(200)
    .json(
      new ApiSuccess(
        "User details updated successfully",
        updatedUserDetails
      )
    );
});

export const deleteUserDetails = dbHandler(async (req, res) => {
  const userId = req.params.userId;

  if (!isValidObjectId(userId)) throw new ApiError("Invalid user id");

  const deletedUserDetails = await UserDetails.findByIdAndDelete(
    userId
  );

  if (!deletedUserDetails)
    throw new ApiError("User details not found");

  res
    .status(200)
    .json(
      new ApiSuccess(
        "User details deleted successfully",
        deletedUserDetails
      )
    );
});
