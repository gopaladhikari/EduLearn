import { Admin } from "../../models/admin/admin.model";
import { ApiError, ApiSuccess } from "../../utils/apiResponse";
import { dbHandler } from "../../utils/dbHandler";
import { registerSchema, loginSchema } from "../../schemas/userSchema";

export const registerAdmin = dbHandler(async (req, res) => {
  const { success, data, error } = registerSchema.safeParse(req.body);

  if (!success) throw new ApiError(400, "Invalid data", error.errors);

  const existingAdmin = await Admin.findOne({
    $or: [{ phoneNumber: data.phoneNumber }, { email: data.email }],
  });

  if (existingAdmin)
    throw new ApiError(
      400,
      "Admin of this email or phone number already exists"
    );

  const newAdmin = await Admin.create({
    fullName: data.fullName,
    phoneNumber: data.phoneNumber,
    email: data.email,
  });

  if (!newAdmin) throw new ApiError(400, "Admin not created");

  res
    .status(201)
    .json(new ApiSuccess("Admin created successfully", newAdmin));
});

export const loginAdmin = dbHandler(async (req, res) => {
  const { success, data, error } = loginSchema.safeParse(req.body);

  if (!success) throw new ApiError(400, "Invalid data", error.errors);

  const admin = await Admin.findOne({
    phoneNumber: data.phoneNumber,
  });

  if (!admin) throw new ApiError(400, "Admin not found");

  const jwtToken = admin.generateJwtToken();

  res.status(200).json(
    new ApiSuccess("Admin logged in successfully", {
      admin,
      jwtToken,
    })
  );
});

export const getAdmin = dbHandler(async (req, res) => {
  const admin = req.admin;

  if (!admin) throw new ApiError(400, "Admin not found");

  return res
    .status(200)
    .json(new ApiSuccess("Admin fetched successfully", admin));
});

export const updateAdmin = dbHandler(async (req, res) => {
  if (!req.admin) throw new ApiError(400, "Admin not found");
  return res
    .status(200)
    .json(new ApiSuccess("Admin update remaining", req.admin));
});

export const deleteAdmin = dbHandler(async (req, res) => {
  if (!req.admin) throw new ApiError(400, "Admin not found");

  const deletedAdmin = await Admin.findByIdAndDelete(req.admin._id);

  if (!deletedAdmin) throw new ApiError(400, "Admin not deleted");

  res.status(200).json(new ApiSuccess("Admin deleted successfully", null));
});
