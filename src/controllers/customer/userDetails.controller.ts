import { cache } from "../../config/node-cache";
import { UserDetails } from "../../models/customer/userDetails.model";
import { userDetailsSchema } from "../../schemas/userSchema";
import { ApiError, ApiSuccess } from "../../utils/apiResponse";
import { dbHandler } from "../../utils/dbHandler";
import { isValidObjectId } from "mongoose";

export const createUserDetails = dbHandler(async (req, res) => {
  const userId = req.user?._id;

  const { success, data, error } = userDetailsSchema.safeParse(req.body);

  if (!success) throw new ApiError(error.message);

  if (!isValidObjectId(userId)) throw new ApiError("Invalid user id");

  const cacheKey = `userDetails-${userId}`;

  const userDetails = await UserDetails.create({
    userId,
    universityName: data.universityName,
    currentlyPursuing: data.currentlyPursuing,
    semester: data.semester,
    subject: data.subject,
  });

  if (!userDetails) throw new ApiError("User details not created");

  if (cache.has(cacheKey)) cache.del(cacheKey);

  res
    .status(201)
    .json(
      new ApiSuccess("User details created successfully", userDetails)
    );
});

export const getUserDetailsById = dbHandler(async (req, res) => {
  const userId = req.user?._id;

  const userDetails = await UserDetails.findById(userId);

  if (!userDetails) throw new ApiError("User details not found");

  const cacheKey = `userDetails-${userId}`;

  if (cache.has(cacheKey)) {
    const cachedUserDetails = cache.get(cacheKey);

    return res
      .status(200)
      .json(
        new ApiSuccess(
          "User details fetched successfully",
          cachedUserDetails
        )
      );
  }

  res
    .status(200)
    .json(
      new ApiSuccess("User details fetched successfully", userDetails)
    );
});

export const updateUserDetails = dbHandler(async (req, res) => {
  const userDetailId = req.params.userDetailId;
  const userId = req.user?._id;

  if (!isValidObjectId(userDetailId))
    throw new ApiError("Invalid user detail  id");

  const { success, data, error } = userDetailsSchema.safeParse(req.body);

  if (!success) throw new ApiError(error.message);

  const updatedUserDetails = await UserDetails.findByIdAndUpdate(
    userDetailId,
    {
      universityName: data.universityName,
      currentlyPursuing: data.currentlyPursuing,
      semester: data.semester,
      subject: data.subject,
    },
    { new: true }
  );

  if (!updatedUserDetails) throw new ApiError("User details not found");

  const cacheKey = `userDetails-${userId}`;

  if (cache.has(cacheKey)) cache.del(cacheKey);

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
  const userDetailId = req.params.userDetailId;

  if (!isValidObjectId(userDetailId))
    throw new ApiError("Invalid user id");

  const deletedUserDetails = await UserDetails.findByIdAndDelete(
    userDetailId
  );

  if (!deletedUserDetails) throw new ApiError("User details not found");

  res
    .status(200)
    .json(
      new ApiSuccess(
        "User details deleted successfully",
        deletedUserDetails
      )
    );
});
