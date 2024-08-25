import { dbHandler } from "../utils/dbHandler";
import { User } from "../models/user.model";
import { ApiError, ApiSuccess } from "../utils/apiResponse";
import { userSchema } from "../schemas/userSchema";

export const signUpWithPhoneNumber = dbHandler(async (req, res) => {
  const { success, data, error } = userSchema.safeParse(req.body);

  if (!success) throw new ApiError(error.message);

  const user = await User.create({
    name: data.name,
    email: data.email,
    mobileno: data.mobileno,
  });

  if (!user) throw new ApiError("User not created");

  res.status(201).json(new ApiSuccess("User created successfully", user));
});

export const loginWithPhoneNumber = dbHandler(async (req, res) => {
  const { mobileno } = req.body;

  if (!mobileno) throw new ApiError("Mobileno is required");

  const user = await User.findOne({ mobileno });

  if (!user) throw new ApiError("User not found");

  res.status(200).json(new ApiSuccess("User found successfully", user));
});
