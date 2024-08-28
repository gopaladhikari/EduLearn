import { dbHandler } from "../utils/dbHandler";
import { User } from "../models/user.model";
import { ApiError, ApiSuccess } from "../utils/apiResponse";
import { userSchema, userSchemaWithPassword } from "../schemas/userSchema";
import { sendOtp } from "../utils/twilio";

export const signUpWithPhoneNumber = dbHandler(async (req, res) => {
  const { success, data, error } = userSchema.safeParse(req.body);

  if (!success) throw new ApiError(error.message);

  const otp = Math.floor(10000 + Math.random() * 90000);

  const user = await User.create({
    name: data.name,
    email: data.email,
    mobileno: data.mobileno,
    otp,
    otpExpiryDate: new Date(new Date().getTime() + 1000 * 60 * 10),
  });

  if (!user) throw new ApiError("User not created");

  const twilio = await sendOtp(
    data.mobileno,
    "Your mobile verification OTP is " + otp
  );

  if (twilio.status === "failed") {
    user.otp = undefined;
    user.otpExpiryDate = undefined;
    user.isMobileNoVerified = false;
    await user.save();
    throw new ApiError("User mobile verification failed");
  }

  res
    .status(201)
    .json(
      new ApiSuccess(
        "User created successfully. Please check your mobile phone for OTP",
        user
      )
    );
});

export const loginWithPhoneNumber = dbHandler(async (req, res) => {
  const { mobileno } = req.body;

  if (!mobileno) throw new ApiError("Mobileno is required");

  const user = await User.findOne({ mobileno, isMobileNoVerified: true });

  if (!user) throw new ApiError("User not found");

  const otp = Math.floor(10000 + Math.random() * 90000);

  const twilio = await sendOtp(
    mobileno,
    "Your mobile verification OTP is " + otp
  );

  if (twilio.status === "failed") throw new ApiError("OTP send failed");

  user.otp = otp;
  user.otpExpiryDate = new Date(new Date().getTime() + 1000 * 60 * 10);
  await user.save();

  res
    .status(201)
    .json(new ApiSuccess("Login OTP sent successfully", user));
});

export const verifySignUpOTP = dbHandler(async (req, res) => {
  const { otp, mobileno } = req.body;

  if (!otp) throw new ApiError("OTP is required");

  if (!mobileno) throw new ApiError("Mobileno is required");

  const user = await User.create({
    mobileno,
    otp,
    otpExpiryDate: new Date(new Date().getTime() + 1000 * 60 * 10),
  });

  if (!user) throw new ApiError("User not found");

  user.otp = undefined;
  user.otpExpiryDate = undefined;
  user.isMobileNoVerified = true;

  await user.save();

  res.status(201).json(new ApiSuccess("OTP verified successfully", user));
});

export const verifyLoginOTP = dbHandler(async (req, res) => {
  const { otp, mobileno } = req.body;

  if (!otp) throw new ApiError("OTP is required");
  if (!mobileno) throw new ApiError("Mobile is required");

  const user = await User.findOne({
    mobileno,
    otp,
    otpExpiryDate: { $gt: new Date() },
    isMobileNoVerified: true,
  });

  if (!user) throw new ApiError("User not found");

  const jwtToken = user.generateJwtToken();

  user.otp = undefined;
  user.jwtToken = jwtToken;
  user.otpExpiryDate = undefined;
  user.isMobileNoVerified = true;

  await user.save();

  res.status(201).json(
    new ApiSuccess("OTP verified successfully", {
      jwtToken,
      user,
    })
  );
});

export const getCurrentUser = dbHandler(async (req, res) => {
  res
    .status(200)
    .json(new ApiSuccess("User fetched successfully", req.user));
});

export const resendOtp = dbHandler(async (req, res) => {
  const { mobileno } = req.body;

  if (!mobileno) throw new ApiError("Mobileno is required");

  const user = await User.findOne({ mobileno });

  if (!user) throw new ApiError("User not found");

  const otp = Math.floor(10000 + Math.random() * 90000);

  const twilio = await sendOtp(
    mobileno,
    "Your mobile verification OTP is " + otp
  );

  if (twilio.status === "failed") throw new ApiError("OTP send failed");

  user.otp = otp;
  user.otpExpiryDate = new Date(new Date().getTime() + 1000 * 60 * 10);
  await user.save();

  res
    .status(201)
    .json(new ApiSuccess("Login OTP sent successfully", user));
});

export const updateUser = dbHandler(async (req, res) => {
  const userId = req.user?._id;

  const { success, data, error } = userSchemaWithPassword.safeParse(
    req.body
  );

  if (!success) throw new ApiError(error.message);

  const user = await User.findById(userId);

  if (!user) throw new ApiError("User not found");

  user.name = data.name;
  user.email = data.email;
  user.mobileno = data.mobileno;
  user.password = data.password;

  await user.save();

  res.status(200).json(new ApiSuccess("User updated successfully", user));
});

export const logout = dbHandler(async (req, res) => {
  const userId = req.user?._id;

  const user = await User.findByIdAndUpdate(userId, {
    $unset: { jwtToken: 1 },
  });

  if (!user) throw new ApiError("User not found");

  delete req.user;

  res
    .status(200)
    .json(new ApiSuccess("User logged out successfully", null));
});
