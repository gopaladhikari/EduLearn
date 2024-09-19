// import { cache } from "../../config/node-cache";
import { User } from "../../models/user/user.model";
import { userSchema } from "../../schemas/userSchema";
import { ApiError, ApiSuccess } from "../../utils/apiResponse";
import { dbHandler } from "../../utils/dbHandler";

export const registerUser = dbHandler(async (req, res) => {
  const { success, data, error } = userSchema.safeParse(req.body);

  if (!success) throw new ApiError(error.message);

  const user = await User.create(data);

  if (!user) throw new ApiError("User not created");

  res.status(201).json(new ApiSuccess("User created successfully", user));
});
