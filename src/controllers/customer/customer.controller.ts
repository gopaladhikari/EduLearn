import { Customer } from "../../models/customer/customer.model";
import { customerDetailsSchema } from "../../schemas/customerSchema";
import { registerSchema, loginSchema } from "../../schemas/userSchema";
import { ApiError, ApiSuccess } from "../../utils/apiResponse";
import { dbHandler } from "../../utils/dbHandler";

export const registerUser = dbHandler(async (req, res) => {
  const { success, data, error } = registerSchema.safeParse(req.body);

  if (!success) throw new ApiError(400, "Invalid data", error.errors);

  const existingCustomer = await Customer.findOne({
    $or: [{ phoneNumber: data.phoneNumber }, { email: data.email }],
  });

  if (existingCustomer)
    throw new ApiError(
      400,
      "User of this email or phone number already exists"
    );

  const newCustomer = await Customer.create({
    fullName: data.fullName,
    phoneNumber: data.phoneNumber,
    email: data.email,
  });

  if (!newCustomer) throw new ApiError(400, "User not created");

  res
    .status(201)
    .json(new ApiSuccess("User created successfully", newCustomer));
});

export const loginUser = dbHandler(async (req, res) => {
  const { success, data, error } = loginSchema.safeParse(req.body);

  if (!success) throw new ApiError(400, "Invalid data", error.errors);

  const customer = await Customer.findOne({
    phoneNumber: data.phoneNumber,
  });

  if (!customer) throw new ApiError(400, "User not found");

  const jwtToken = customer.generateJwtToken();

  res.status(200).json(
    new ApiSuccess("User logged in successfully", {
      customer,
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

export const updateCustomer = dbHandler(async (req, res) => {
  const customerId = req.customer?._id;

  const { success, data, error } = customerDetailsSchema.safeParse(
    req.body
  );

  if (!success) throw new ApiError(400, "Invalid data", error.errors);

  const customer = await Customer.findById(customerId).select("-password");

  if (!customer) throw new ApiError(404, "User not found");

  customer.fullName = data.fullName;
  customer.email = data.email;
  customer.phoneNumber = data.phoneNumber;
  customer.password = data.password;

  const updatedCustomer = await customer.save();

  if (!updatedCustomer) throw new ApiError(400, "User not updated");

  res
    .status(200)
    .json(new ApiSuccess("User updated successfully", updatedCustomer));
});
