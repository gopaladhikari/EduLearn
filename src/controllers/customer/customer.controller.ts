import { Customer } from "../../models/customer/customer.model";
import { ApiError, ApiSuccess } from "../../utils/apiResponse";
import { dbHandler } from "../../utils/dbHandler";
import { loginSchema, registerSchema } from "../../schemas/userSchema";

export const registerUser = dbHandler(async (req, res) => {
  const { success, data, error } = registerSchema.safeParse(req.body);

  if (!success) throw new ApiError(400, "Invalid data", error.errors);

  const existingUser = await Customer.findOne({
    $or: [{ phoneNumber: data.phoneNumber }, { email: data.email }],
  });

  if (existingUser)
    throw new ApiError(
      400,
      "User of this email or phone number already exists"
    );

  const user = await Customer.create({
    fullName: data.fullName,
    phoneNumber: data.phoneNumber,
    email: data.email,
    isPhoneNumberVerified: true,
  });

  if (!user) throw new ApiError(400, "User not created");

  res.status(201).json(new ApiSuccess("User created successfully", user));
});

export const loginUser = dbHandler(async (req, res) => {
  const { success, data, error } = loginSchema.safeParse(req.body);

  if (!success) throw new ApiError(400, "Invalid data", error.errors);

  const user = await Customer.findOne({
    phoneNumber: data.phoneNumber,
  });

  if (!user) throw new ApiError(400, "User not found");

  const jwtToken = user.generateJwtToken();

  res.status(200).json(
    new ApiSuccess("User logged in successfully", {
      user,
      jwtToken,
    })
  );
});

export const getCustomer = dbHandler(async (req, res) => {
  if (!req.customer) throw new ApiError(400, "User not found");

  return res
    .status(200)
    .json(new ApiSuccess("User fetched successfully", req.customer));
});
