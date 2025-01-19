import { cache } from "../../config/node-cache";
import { CustomerDetails as UserDetails } from "../../models/customer/custumerDetails.model";
import { customerDetailsSchema } from "../../schemas/customerSchema";
import { ApiError, ApiSuccess } from "../../utils/apiResponse";
import { dbHandler } from "../../utils/dbHandler";
import { isValidObjectId } from "mongoose";

export const createUserDetails = dbHandler(async (req, res) => {
  const userId = req.customer?._id;

  const { success, data, error } = customerDetailsSchema.safeParse(
    req.body
  );

  if (!success) throw new ApiError(400, error.message);

  const cacheKey = `userDetails-${userId}`;

  const userDetails = await UserDetails.create({
    userId,
    // universityId: data.,
    // currentPursuingId: data.currentPursuingId,
    // semesterId: data.semesterId,
    // subjectIds: data.subjectIds,
  });

  if (!userDetails)
    throw new ApiError(400, "User details not created");

  if (cache.has(cacheKey)) cache.del(cacheKey);

  res
    .status(201)
    .json(
      new ApiSuccess("User details created successfully", userDetails)
    );
});

export const getUserDetailsById = dbHandler(async (req, res) => {
  const userId = req.customer?._id;

  const userDetails = await UserDetails.findOne({ userId }).populate({
    path: "universityId",
    select: "name",
    populate: {
      path: "currentPursuingId",
      select: "name",
      populate: {
        path: "semesterId",
        select: "name",
        populate: {
          path: "subjectIds",
          select: "name",
        },
      },
    },
  });

  if (!userDetails) throw new ApiError(404, "User details not found");

  res
    .status(200)
    .json(
      new ApiSuccess("User details fetched successfully", userDetails)
    );
});

export const updateUserDetails = dbHandler(async (req, res) => {
  const userDetailId = req.params.userDetailId;
  const userId = req.customer?._id;

  if (!isValidObjectId(userDetailId))
    throw new ApiError(400, "Invalid user detail  id");

  const { success, data, error } = customerDetailsSchema.safeParse(
    req.body
  );

  if (!success) throw new ApiError(400, error.message);

  const cacheKey = `userDetails-${userId}`;

  if (cache.has(cacheKey)) cache.del(cacheKey);

  res
    .status(200)
    .json(new ApiSuccess("User details updated successfully", data));
});

export const deleteUserDetails = dbHandler(async (req, res) => {
  const userDetailId = req.params.userDetailId;

  if (!isValidObjectId(userDetailId))
    throw new ApiError(400, "Invalid user id");

  const deletedUserDetails = await UserDetails.findByIdAndDelete(
    userDetailId
  );

  if (!deletedUserDetails)
    throw new ApiError(400, "User details not found");

  res
    .status(200)
    .json(
      new ApiSuccess(
        "User details deleted successfully",
        deletedUserDetails
      )
    );
});
